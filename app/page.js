export default function Home() {
  return (
    <div className="min-h-screen p-8 pt-36 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center py-20">
        <h1 className="text-4xl md:text-7xl text-center font-medium">
          Ready - Write, Upload & Read
        </h1>
        <p className="md:text-2xl text-center">
          Write your story, upload it as a PDF and spread it across!
        </p>
        <p className="md:text-2xl text-center">Or just store it here!</p>
      </main>
    </div>
  );
}
