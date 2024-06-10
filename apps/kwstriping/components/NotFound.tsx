import Button from '@tempo/ui/components/buttons/Button';

function NotFound() {
  return (
    <div className="p-48 bg-white/90 h-full">
      <h1 className="px-8 text-center">Page not found</h1>
      <main>
        <div className="container p-8 text-center">
          <Button href={'/'}>Go home</Button>
        </div>
      </main>
    </div>
  );
}

export default NotFound;
