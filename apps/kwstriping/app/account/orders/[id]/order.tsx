import { OrderDocument } from '@tempo/api/generated/graphql';
import { useUser } from '@tempo/api/auth/react/hooks';
import { AddressDisplay } from '@tempo/ui/components/AddressDisplay';
import { Spinner } from '@tempo/ui/components/Spinner';
import { useLocalization } from '@tempo/ui/providers/LocalizationProvider';
import { useQuery } from '@tempo/api/hooks/useQuery';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

function OrderPage({ id }: { id: string }) {
  const { formatPrice } = useLocalization();
  const { authenticated } = useUser();
  const [{ fetching: loading, error, data }] = useQuery(OrderDocument, {
    variables: { id: id as string },
    pause: !id || !authenticated,
  });

  if (loading) return <Spinner />;
  if (error) {
    return <div>Error :{error.message}</div>;
  }

  if (!data || !data?.order) return null;
  const order = data?.order;

  return (
    <>
      <div className={'ml-3'}>
        <Typography variant={'h1'} className="mb-2">
          Order #{order?.number}
        </Typography>
        <Typography className="md:ml-20 font-semibold mb-4">Status: {order?.status}</Typography>
        <div className="grid grid-cols-2 md:grid-cols-4 mt-10 max-w-6xl h-full">
          <div className="col-span-2 md:col-span-4">
            <table className="w-full divide-y table-fixed">
              <thead className="text-center">
                <tr>
                  <td className="md:w-1/4 font-semibold text-md md:text-center text-left">
                    Items
                  </td>
                  <td className="md:w-1/4 font-semibold text-md">Price</td>
                  <td className="md:w-1/4 font-semibold text-md">Quantity</td>
                  <td className="md:w-1/4 font-semibold text-md text-right">
                    <p className="mr-3 md:mr-10">Total</p>
                  </td>
                </tr>
              </thead>
              <tbody className="text-center divide-y">
                {order?.lines.map((line) => (
                  <tr key={line.id} className="h-16">
                    <td className="my-3">
                      <div className="flex flex-row justify-center">
                        {line.thumbnail && (
                          <Image
                            src={line.thumbnail.url || '/'}
                            alt={line.thumbnail.alt || ' '}
                            width={70}
                            height={70}
                          />
                        )}
                        <div className="flex flex-col justify-center">
                          <div>{line.productName}</div>
                          {/* <div className="text-xs text-left text-gray-600">{line.productVariantName}</div> */}
                        </div>
                      </div>
                    </td>
                    <td>{formatPrice(line?.unitPrice.gross)}</td>
                    <td>{line?.quantity}</td>
                    <td>
                      <p className="mr-3 md:mr-10 text-right">
                        {formatPrice(line?.totalPrice.gross)}
                      </p>
                    </td>
                  </tr>
                ))}
                <tr />
              </tbody>
            </table>
          </div>
          <div className="md:col-start-3 text-md h-16">
            <div className="mt-5 text-left md:text-center">Subtotal</div>
          </div>
          <div className="text-md text-center">
            <p className="mt-5 text-right mr-3 md:mr-10">{formatPrice(order?.subtotal.net)}</p>
          </div>
          <div className="md:col-start-3 col-span-2 border-t" />
          <div className="md:col-start-3 text-md h-16">
            <div className="mt-5 text-left md:text-center">Shipping Price</div>
          </div>
          <div className="text-md text-center">
            <p className="mt-5 text-right mr-3 md:mr-10">
              {formatPrice(order?.shippingPrice.gross)}
            </p>
          </div>
          <div className="md:col-start-3 col-span-2 border-t" />
          <div className="md:col-start-3 text-md font-semibold h-16">
            <div className="mt-5 text-left md:text-center">Total</div>
          </div>
          <div className="text-md font-semibold text-center">
            <p className="mt-5 text-right mr-3 md:mr-10">{formatPrice(order?.total.gross)}</p>
          </div>
        </div>
      </div>

      {!!order?.billingAddress && (
        <div className="col-span-2 mr-2 my-2 p-4 rounded shadow-xs bg-white border md:w-1/2 md:col-span-2 md:w-full">
          <Typography variant={'h2'} className="font-semibold text-lg mb-2">
            Billing Address
          </Typography>
          <AddressDisplay address={order.billingAddress} />
        </div>
      )}

      {!!order?.shippingAddress && (
        <div className="col-span-2 mr-2 md:ml-2 my-2 p-4 shadow-xs rounded bg-white border md:w-1/2 md:col-start-3 md:col-span-2 md:w-full">
          <Typography variant={'h2'} className="font-semibold text-lg mb-2">
            Shipping Address
          </Typography>
          <AddressDisplay address={order.shippingAddress} />
        </div>
      )}
    </>
  );
}

export default OrderPage;

// OrderPage.getLayout = function getLayout(page: ReactElement) {
//   return <AccountLayout>{page}</AccountLayout>;
// };
