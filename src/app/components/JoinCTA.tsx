import { MessageCircle, ArrowRight } from 'lucide-react';

export function JoinCTA() {
  const handleJoinClick = () => {
    // Replace with your actual WhatsApp community link
    window.open('https://chat.whatsapp.com/YOUR_COMMUNITY_LINK', '_blank');
  };

  return (
    <section id="join" className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* CTA Card */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200">
            <div className="text-center">
              <div className="inline-flex p-4 bg-[#c1ff72]/20 rounded-2xl mb-6">
                <MessageCircle className="text-[#c1ff72]" size={48} />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-[#003a89] mb-4">
                WhatsApp Community
              </h2>

              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Already active in SportMetr? Join our WhatsApp Community to connect with members from all chapters, stay updated on network-wide events, and collaborate on projects.
              </p>

              <button
                onClick={handleJoinClick}
                className="px-10 py-5 bg-[#c1ff72] hover:bg-[#b0ee61] text-gray-900 rounded-full text-lg font-medium transition-all hover:scale-105 inline-flex items-center gap-3 shadow-lg group"
              >
                <MessageCircle size={24} />
                Join WhatsApp Community
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-sm text-gray-500 mt-6">
                For active SportMetr members only
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
