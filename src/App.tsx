import { LimerickGenerator } from './components/LimerickGenerator';

// Main application component with FLL Unearthed theme
export default function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FBF3ED' }}>
      <div className="text-white py-8 px-4 shadow-lg" style={{ backgroundColor: '#F26A21' }}>
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col items-center justify-center gap-4">
            <img
              src="https://www.firstinspires.org/hs-fs/hubfs/image-library/web/fll_unearthed_1240x860.webp?width=630"
              alt="FIRST LEGO League - Unearthed"
              className="h-32 w-auto object-contain"
            />
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-1">Limerick Generator</h1>
              <p className="text-lg opacity-90">Create celebratory limericks for award presentations</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <LimerickGenerator />
      </div>
    </div>
  );
}
