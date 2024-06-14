import * as m from '@paraglide/messages';
import type { ProductDetailsFragment } from '@tempo/api/generated/graphql';
// import { useTranslation } from '@tempo/next/i18n';
import { getProductAttributes } from '@tempo/ui/utils/product';

export interface AttributeDetailsProps {
  product: Maybe<ProductDetailsFragment>;
  selectedVariant?: Maybe<ProductDetailsFragment>;
}

export function AttributeDetails({ product, selectedVariant }: AttributeDetailsProps) {
  if (!product || !selectedVariant) return null;
  const attributes = getProductAttributes(product, selectedVariant);
  if (attributes.length === 0) return null;
  return (
    <div>
      <p className="text-lg my-1 font-medium text-gray-500">{m.attributes() ?? 'Attributes'}</p>
      <table className={'table-auto w-full border border-solid border-collapse border-slate-500'}>
        <tbody>
          {attributes.map((attribute) => (
            <tr key={attribute.id}>
              <th scope="row" className={'text-left border border-solid p-2 px-3'}>
                {attribute.name}
                {/* {translate(attribute, 'name')} */}
              </th>
              <td className={'border border-solid p-2'}>
                {/* {attribute.values.map((value, index) => {
                  if (!value) return null;
                  return (
                    <div key={value.id} className={'text-center'}>
                      {translate(value, 'name')}
                      {attribute.values.length !== index + 1 && <div>{' | '}</div>}
                    </div>
                  );
                })} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
