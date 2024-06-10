import { newPasswordUrl } from '@core/auth/urls';
import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useQuery } from '@core/urql/hooks';
import { useMutation } from '@core/urql/hooks/useMutation';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import urlJoin from 'url-join';
import { useShopLimitsQuery } from '@dashboard/components/core/Shop/queries';
import DeleteFilterTabDialog from '@dashboard/components/dialogs/DeleteFilterTabDialog';
import type { SaveFilterTabDialogFormData } from '@dashboard/components/dialogs/SaveFilterTabDialog';
import SaveFilterTabDialog from '@dashboard/components/dialogs/SaveFilterTabDialog';
import type { AddMemberFormData } from '@dashboard/components/staff/StaffAddMemberDialog';
import StaffAddMemberDialog from '@dashboard/components/staff/StaffAddMemberDialog';
import StaffListPage from '@dashboard/components/staff/StaffListPage';
import { StaffMemberAddDocument, StaffListDocument } from '@core/api/graphql';
import useListSettings from '@dashboard/hooks/useListSettings';
import { usePaginationReset } from '@dashboard/hooks/usePaginationReset';
import usePaginator, {
  createPaginationState,
  PaginatorContext,
} from '@dashboard/hooks/usePaginator';
import { DEFAULT_INITIAL_SEARCH_DATA } from '@dashboard/oldSrc/config';
import { getStringOrPlaceholder } from '@dashboard/oldSrc/misc';
import useGroupSearch from '@dashboard/oldSrc/searches/useGroupSearch';
import { getSortQueryVariables } from '@dashboard/oldSrc/staff/sort';
import {
  deleteFilterTab,
  getActiveFilters,
  getFilterOpts,
  getFilterQueryParam,
  getFiltersCurrentTab,
  getFilterTabs,
  getFilterVariables,
  saveFilterTab,
} from '@dashboard/oldSrc/staff/StaffList/filters';
import type { StaffListUrlDialog, StaffListUrlQueryParams } from '@dashboard/oldSrc/staff/urls';
import { staffMemberDetailsUrl } from '@dashboard/oldSrc/staff/urls';
import { ListViews } from '@dashboard/oldSrc/types';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import useFilterHandlers from '@dashboard/oldSrc/utils/handlers/filterHandlers';
import useSortHandler from '@dashboard/oldSrc/utils/handlers/sortHandler';
import { getSortParams } from '@dashboard/oldSrc/utils/sort';
import { getAppMountPathForRedirect } from '@dashboard/oldSrc/utils/urls';

interface StaffListProps {
  params: StaffListUrlQueryParams;
}

export const StaffList = () => {
  const router = useRouter();
  const params = router.query;
  const notify = useNotifier();
  const { updateListSettings, settings } = useListSettings(ListViews.StaffMembersList);
  const { t } = useTranslation();

  usePaginationReset(
    (params = {}) => ({ pathname: '/staff', query: params }),
    params,
    settings.rowNumber
  );

  const paginationState = createPaginationState(settings.rowNumber, params);
  const queryVariables = useMemo(
    () => ({
      ...paginationState,
      filter: getFilterVariables(params),
      sort: getSortQueryVariables(params),
    }),
    [params, settings.rowNumber] // eslint-disable-line react-hooks/exhaustive-deps
  );
  const [{ data: staffQueryData, fetching: loading }] = useQuery(StaffListDocument, {
    displayLoader: true,
    variables: queryVariables,
  });
  const limitOpts = useShopLimitsQuery({
    variables: {
      staffUsers: true,
    },
  });

  const [addStaffMember, addStaffMemberData] = useMutation(StaffMemberAddDocument, {
    onCompleted: (data) => {
      if (data?.createStaff?.errors?.length === 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
        void router.push(staffMemberDetailsUrl(data?.createStaff?.user?.id));
      }
    },
  });

  const paginationValues = usePaginator({
    pageInfo: staffQueryData?.staffUsers?.pageInfo,
    paginationState,
    queryString: params,
  });

  const handleSort = useSortHandler(
    router,
    (params = {}) => ({ pathname: '/staff', query: params }),
    params
  );

  const tabs = getFilterTabs();

  const currentTab = getFiltersCurrentTab(params, tabs);

  const [changeFilters, resetFilters, handleSearchChange] = useFilterHandlers({
    createUrl: (params = {}) => ({ pathname: '/staff', query: params }),
    getFilterQueryParam,
  });

  const [openModal, closeModal] = useDialogActionHandlers<
    StaffListUrlDialog,
    StaffListUrlQueryParams
  >((params = {}) => ({ pathname: '/staff', query: params }), params);

  const handleTabChange = (tab: number) => {
    const filterTab = getFilterTabs()[tab - 1];
    filterTab &&
      void router.push({
        pathname: '/staff',
        query: {
          activeTab: tab.toString(),
          ...filterTab.data,
        },
      });
  };

  const handleTabDelete = () => {
    deleteFilterTab(currentTab);
    void router.push('/staff');
  };

  const handleTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data?.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  const {
    loadMore: loadMoreGroups,
    search: searchGroups,
    result: searchGroupsOpts,
  } = useGroupSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });

  const handleStaffMemberAdd = (variables: AddMemberFormData) =>
    addStaffMember({
      input: {
        addGroups: variables.groups,
        email: variables.email,
        firstName: variables.firstName,
        lastName: variables.lastName,
        // TODO
        redirectUrl: urlJoin(
          window.location.origin,
          getAppMountPathForRedirect(),
          newPasswordUrl().replace(/\?/, '')
        ),
      },
    });

  return (
    <PaginatorContext.Provider value={paginationValues}>
      <StaffListPage
        currentTab={currentTab}
        filterOpts={getFilterOpts(params)}
        initialSearch={params.query || ''}
        onSearchChange={handleSearchChange}
        onFilterChange={changeFilters}
        onAll={resetFilters}
        onTabChange={handleTabChange}
        onTabDelete={() => openModal('delete-search')}
        onTabSave={() => openModal('save-search')}
        tabs={tabs.map((tab) => tab.name)}
        disabled={loading || addStaffMemberData.loading || limitOpts.fetching}
        limits={limitOpts.data?.shop.limits}
        settings={settings}
        sort={getSortParams(params)}
        staffMembers={mapEdgesToItems(staffQueryData?.staffUsers)}
        onAdd={() => openModal('add')}
        onUpdateListSettings={updateListSettings}
        onSort={handleSort}
      />
      <StaffAddMemberDialog
        availableGroups={mapEdgesToItems(searchGroupsOpts?.data?.search)}
        confirmButtonState={addStaffMemberData.status}
        initialSearch=""
        disabled={loading}
        errors={addStaffMemberData.data?.createStaff?.errors || []}
        open={params.action === 'add'}
        onClose={closeModal}
        onConfirm={handleStaffMemberAdd}
        fetchMoreGroups={{
          hasMore: searchGroupsOpts.data?.search?.pageInfo.hasNextPage,
          loading: searchGroupsOpts.fetching,
          onFetchMore: loadMoreGroups,
        }}
        onSearchChange={searchGroups}
      />
      <SaveFilterTabDialog
        open={params.action === 'save-search'}
        confirmButtonState="default"
        onClose={closeModal}
        onSubmit={handleTabSave}
      />
      <DeleteFilterTabDialog
        open={params.action === 'delete-search'}
        confirmButtonState="default"
        onClose={closeModal}
        onSubmit={handleTabDelete}
        tabName={getStringOrPlaceholder(tabs[currentTab - 1]?.name)}
      />
    </PaginatorContext.Provider>
  );
};

export default StaffList;
