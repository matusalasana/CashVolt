import { Toaster } from 'react-hot-toast';

function ToastMessage() {
  return (
    <div>
      {/* Your app components */}
      <Toaster 
        position="top-center" 
        reverseOrder={false}
      />
    </div>
  );
}
export default ToastMessage