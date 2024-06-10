import type { AddressFormData } from '@core/types';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import type { FC, MutableRefObject, SyntheticEvent } from 'react';
import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { create } from 'zustand';

interface PlacesState {
  places: Record<string, google.maps.places.PlaceResult>;
  setPlace: (id: string, place: google.maps.places.PlaceResult) => void;
}

const usePlaceStore = create<PlacesState>((set) => ({
  places: {} as Record<string, google.maps.places.PlaceResult>,
  setPlace: (id: string, place: google.maps.places.PlaceResult) => {
    set((state) => ({ places: { ...state.places, [id]: place } }));
  },
}));

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
if (!GOOGLE_MAPS_API_KEY) {
  throw new Error('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not defined');
}

type AddressFieldName = keyof AddressFormData;

interface AddressAutocompleteInputProps {
  label?: string;
  allowNames?: boolean;
  bounds?: { sw: [number, number]; ne: [number, number] };
  allowedCountries?: { code: string; name: string }[];
  allowedStates?: string[];
  basedFields?: Record<string, AddressFieldName>;
  defaultValue?: string;
  setValue?: (name: AddressFieldName, value: string) => void;
  onChange?: (event: SyntheticEvent, place: google.maps.places.PlaceResult | null) => void;
  inputRef?: MutableRefObject<HTMLInputElement | null>;
  disabled?: boolean;
}

const IGNORED_PLACE_TYPES = ['locality', 'political'];

const InnerAddressAutocompleteInput: FC<AddressAutocompleteInputProps> = ({
  label = 'Address',
  allowNames = false,
  bounds,
  allowedCountries,
  allowedStates,
  basedFields = {},
  defaultValue,
  setValue,
  onChange,
  inputRef,
  disabled,
}: AddressAutocompleteInputProps) => {
  const { places: storedPlaces, setPlace } = usePlaceStore();
  const autocompleteInputRef = useRef<HTMLInputElement | null>(
    inputRef ? inputRef.current : null
  );
  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | undefined>();
  const googleAttributionRef = useRef<HTMLDivElement | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | undefined>();
  const [inputValue, setInputValue] = useState(defaultValue || '');
  const [options, setOptions] = useState<string[]>([]);
  const autocompleteServiceOptions = useMemo(
    () => ({
      componentRestrictions: allowedCountries ? { country: ['us'] } : undefined, // TODO
      bounds: bounds
        ? new google.maps.LatLngBounds(
            new google.maps.LatLng(...bounds.sw),
            new google.maps.LatLng(...bounds.ne)
          )
        : undefined,
      fields: ['address_components', 'formatted_address', 'geometry.location'],
      ...(allowNames ? {} : { types: ['address'] }),
      input: inputValue,
    }),
    [inputValue, allowNames, bounds, allowedCountries]
  );
  useEffect(() => {
    autocompleteServiceRef.current = new google.maps.places.AutocompleteService();
    if (!autocompleteInputRef.current || !googleAttributionRef.current) return;
    placesServiceRef.current = new google.maps.places.PlacesService(googleAttributionRef.current);
    autocompleteInputRef.current.addEventListener('focus', () =>
      autocompleteInputRef.current?.setAttribute('autocomplete', 'new-password')
    );
  }, []);
  useEffect(() => {
    if (!autocompleteServiceRef.current || !inputValue) return;
    const filteredSuggestions: google.maps.places.QueryAutocompletePrediction[] = [];
    autocompleteServiceRef.current.getQueryPredictions(
      autocompleteServiceOptions,
      function (predictions) {
        if (!predictions?.length) return; // TODO
        // console.log('allowedStates:', allowedStates);
        for (const prediction of predictions) {
          // If state is missing, exclude result.
          if (allowedStates?.length && prediction.terms.length < 4) {
            console.debug('Excluding result that misses state');
            continue;
          }
          if (
            allowedStates?.length &&
            prediction.terms.length > 3 &&
            prediction.terms[3] &&
            !allowedStates.includes(prediction.terms[3].value)
          ) {
            continue;
          }
          filteredSuggestions.push(prediction);
        }
        // console.log('filteredSuggestions:', filteredSuggestions);
        // console.log('Suggestions:', filteredSuggestions);
        const placeIds: string[] = filteredSuggestions.map(({ place_id }) => place_id!);
        if (!placesServiceRef.current) return placeIds;
        for (const placeId of placeIds) {
          if (!placeId) continue; // TODO: investigate
          if (!storedPlaces[placeId]) {
            // console.log(`Getting place details for ${placeId} ...`);
            placesServiceRef.current.getDetails({ placeId }, function (place, _status) {
              if (place) setPlace(placeId, place);
            });
          }
        }
        // console.log('Results:', placeIds);
        if (placeIds.length) setOptions(placeIds);
      }
    );
  }, [inputValue, autocompleteServiceOptions, allowedStates]);

  const respondToPlaceChange = useCallback((place: google.maps.places.PlaceResult | null) => {
    if (!place) return;
    console.log('Responding to place change...');
    const latitudeField = document.querySelector(`[name$="latitude"]`) as HTMLInputElement | null;
    const longitudeField = document.querySelector(
      `[name$="longitude"]`
    ) as HTMLInputElement | null;

    // place.address_components are google.maps.GeocoderAddressComponent objects,
    // which are documented at http://goo.gle/3l5i5Mr
    const addressComponents = place.address_components ?? [];

    const companyName = place.name || '';
    let address1 = '';
    let city = '';
    let state = '';
    let postalCode = '';
    let country = '';

    // formattedStringField.value = place.formatted_address;
    const newLatitude = place.geometry?.location?.lat();
    const newLongitude = place.geometry?.location?.lng();

    if (latitudeField && longitudeField) {
      latitudeField.value = `${newLatitude ?? ''}`;
      longitudeField.value = `${newLongitude ?? ''}`;
    }

    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    for (const component of addressComponents) {
      const componentType = component.types[0];

      switch (componentType) {
        case 'street_number': {
          address1 = `${component.long_name} ${address1}`;
          break;
        }
        case 'route': {
          address1 += component.short_name;
          break;
        }
        case 'postal_code': {
          postalCode = `${component.long_name}${postalCode}`;
          break;
        }
        case 'postal_code_suffix': {
          postalCode = `${postalCode}-${component.long_name}`;
          break;
        }
        case 'locality':
          city = component.long_name;
          break;
        case 'administrative_area_level_1': {
          state = component.short_name;
          break;
        }
        case 'country':
          country = component.short_name;
          break;
        default:
          console.log(component);
          break;
      }
    }

    for (const [key, fieldName] of Object.entries(basedFields)) {
      // console.log('>>> key', key, 'fieldName', fieldName);
      switch (key) {
        case 'companyName':
          setValue?.(fieldName, companyName);
          break;
        case 'streetAddress1':
          setValue?.(fieldName, address1);
          break;
        case 'streetAddress2':
          break;
        case 'city':
          setValue?.(fieldName, city);
          break;
        case 'state':
        case 'countryArea':
          setValue?.(fieldName, state);
          break;
        case 'postalCode':
          setValue?.(fieldName, postalCode);
          break;
        case 'country':
          setValue?.(fieldName, country);
          break;
        case 'countryCode':
          setValue?.(fieldName, country);
          break;
        default:
          throw new Error(`Unknown key ${key}`);
      }
    }
  }, []);

  // console.log('>>> options', options);
  if (typeof inputValue !== 'string') throw new Error('wtf');
  return (
    <>
      <Autocomplete
        freeSolo
        className="bg-white"
        inputValue={inputValue}
        onInputChange={(event, value, reason) => {
          console.log('Autocomplete.onInputChange', typeof value);

          // Disable triggering the onChange event on the containing form
          event.stopPropagation();

          setInputValue(value || '');
          if (!value && reason === 'clear') {
            for (const [, fieldName] of Object.entries(basedFields)) {
              console.log('Clearing', fieldName);
              setValue?.(fieldName, '');
            }
          }
        }}
        onChange={(event, value) => {
          console.log('Autocomplete.onChange', value);
          if (!value) return;
          const place = storedPlaces[value];
          if (!place) return;
          respondToPlaceChange(place);
          onChange?.(event, place);
        }}
        options={options}
        getOptionLabel={(option) => {
          const place = storedPlaces[option];
          if (!place) return '';
          if (IGNORED_PLACE_TYPES.some((_) => place.types?.includes(_))) return '';
          const formattedAddress = place.formatted_address?.replace(/, USA$/, '');
          if (!['premise', 'street_address'].some((_) => place.types?.includes(_))) {
            if (place.name && formattedAddress) return `${place.name}, ${formattedAddress}`;
            if (place.name) return place.name;
          }
          return formattedAddress ?? '';
        }}
        renderInput={(params) => {
          return (
            <TextField
              label={label}
              {...params}
              InputProps={{
                ...params.InputProps,
                inputRef: autocompleteInputRef,
              }}
              disabled={disabled}
            />
          );
        }}
        spellCheck={false}
      />
      <div id={'googleAttribution'} className={'hidden'} ref={googleAttributionRef} />
    </>
  );
};

export const AddressAutocompleteInput: FC<AddressAutocompleteInputProps> = (props) => {
  const render = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return <></>;
      case Status.FAILURE:
        return <></>;
      case Status.SUCCESS:
        return <InnerAddressAutocompleteInput {...props} />;
      default:
        return <></>;
    }
  };
  return <Wrapper apiKey={GOOGLE_MAPS_API_KEY} render={render} libraries={['places']} />;
};

export default AddressAutocompleteInput;
