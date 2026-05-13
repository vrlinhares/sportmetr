import bannerImage from '../../imports/IMG_7056.JPG';

export function ImageBanner() {
  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <img
            src={bannerImage}
            alt="SportMetr Banner"
            className="w-full h-auto rounded-3xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
