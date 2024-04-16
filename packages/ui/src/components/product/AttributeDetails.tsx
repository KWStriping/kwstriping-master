import type { ProductDetailsFragment, ProductDetailsFragment } from '@core/api';
import { useTranslation } from '@core/i18n';
import { getProductAttributes } from '@core/ui/utils/product';
import { translate } from '@core/ui/utils/translations';

export interface AttributeDetailsProps {
  product: Maybe<ProductDetailsFragment>;
  selectedVariant?: Maybe<ProductDetailsFragment>;
}

export function AttributeDetails({ product, selectedVariant }: AttributeDetailsProps) {
  const { t } = useTranslation();
  if (!product || !selectedVariant) return null;
  const attributes = getProductAttributes(product, selectedVariant);
  if (attributes.length === 0) return null;
  return (
    <div>
      <p className="text-lg my-1 font-medium text-gray-500">{t('attributes', 'Attributes')}</p>
      <table className={'table-auto w-full border border-solid border-collapse border-slate-500'}>
        <tbody>
          {attributes.map((attribute) => (
            <tr key={attribute.attribute.id}>
              <th scope="row" className={'text-left border border-solid p-2 px-3'}>
                {translate(attribute.attribute, 'name')}
              </th>
              <td className={'border border-solid p-2'}>
                {attribute.values.map((value, index) => {
                  if (!value) return null;
                  return (
                    <div key={value.id} className={'text-center'}>
                      {translate(value, 'name')}
                      {attribute.values.length !== index + 1 && <div>{' | '}</div>}
                    </div>
                  );
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
