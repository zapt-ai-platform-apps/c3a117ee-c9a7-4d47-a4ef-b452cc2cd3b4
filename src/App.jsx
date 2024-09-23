import { createSignal, Show } from 'solid-js';
import { supabase, createEvent } from './supabaseClient';

function App() {
  const [loading, setLoading] = createSignal(false);
  const [imageUrl, setImageUrl] = createSignal('');

  const handleGenerateImage = async () => {
    setLoading(true);
    try {
      const result = await createEvent('generate_image', {
        prompt: 'Generate a beautiful image'
      });
      setImageUrl(result);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div class="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md h-full">
        <h1 class="text-4xl font-bold mb-6 text-center">جميل</h1>
        <button
          class="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
          onClick={handleGenerateImage}
          disabled={loading()}
        >
          <Show when={!loading()} fallback={<span>Loading...</span>}>
            Generate Beautiful Image
          </Show>
        </button>
        <Show when={imageUrl()}>
          <div class="mt-6">
            <img src={imageUrl()} alt="Beautiful Image" class="w-full h-auto rounded" />
          </div>
        </Show>
      </div>
    </div>
  );
}

export default App;