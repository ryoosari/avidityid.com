import { BuildingOfficeIcon, GlobeAltIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function CompanyInfo() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Informations, Supplies & Everything Else!
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Avidity Id focuses on delivering the highest quality of various products and electronic office supplies. 
            Our products, services and final quality control is under direct supervision by our Owner.
          </p>
        </div>

        {/* Business Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <BuildingOfficeIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Digital Office Solutions</h3>
            <p className="text-gray-600">
              Comprehensive range of professional software, utilities, and digital resources for modern business operations.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <GlobeAltIcon className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Global Marketplace</h3>
            <p className="text-gray-600">
              Established presence on leading e-commerce platforms serving customers worldwide since 2015.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
              <ShieldCheckIcon className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality Assurance</h3>
            <p className="text-gray-600">
              Direct owner supervision ensures the highest standards for all products and services we deliver.
            </p>
          </div>
        </div>

        {/* Marketplace Presence */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Our Marketplace Presence
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-lg">T</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Tokopedia</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Operating since 2015 on one of Indonesia's finest e-commerce platforms. Our top-selling online store.
                </p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Since 2015
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">B</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">BukaLapak</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Another top e-commerce platform in Indonesia where our online store serves customers and neighboring countries.
                </p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Regional Reach
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-lg">S</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Shopee Indonesia</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Leading Singaporean e-commerce platform. Our product range here is curated due to their quality standards.
                </p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Premium Selection
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Ready to explore our digital solutions?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            From specialized software to creative resources, discover everything your digital office needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/downloads"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Browse Downloads
            </a>
            <a
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 