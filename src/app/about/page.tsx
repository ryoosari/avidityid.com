import React from 'react';
import { Metadata } from 'next';
import AvidityLogo from '@/components/ui/AvidityLogo';
import Breadcrumb from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'About Us | Avidity Id - Digital Office Solutions',
  description: 'Learn about Avidity Id, your trusted partner for digital printing and banking electronic equipment. Driven by discipline, passion, and outstanding commitment to clients worldwide.',
  keywords: ['Avidity Id', 'digital printing', 'banking equipment', 'office solutions', 'electronic equipment', 'business services'],
  openGraph: {
    title: 'About Avidity Id - Digital Office Solutions',
    description: 'Discover how Avidity Id delivers high-quality digital printing and banking electronic equipment to businesses worldwide.',
    type: 'website',
    url: 'https://avidityid.com/about',
    siteName: 'Avidity Id',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Avidity Id Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Avidity Id - Digital Office Solutions',
    description: 'Learn about Avidity Id, your trusted partner for digital office solutions and banking electronic equipment.',
    images: ['/images/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://avidityid.com/about',
  },
};

export default function AboutPage() {
  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about', current: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-5xl mx-auto px-4 pt-4 pb-16">
        {/* Breadcrumb Navigation */}
        <div className="mb-0">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        {/* Header Section */}
        <div className="text-center mb-20 -mt-2">
          <div className="inline-block p-4 bg-blue-50 rounded-full mb-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-inner">
              <AvidityLogo size="sm" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About Avidity Id</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your trusted partner for digital office solutions and banking electronic equipment
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-8"></div>
        </div>

        {/* Company Story Section */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400"></div>
            
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
              <div className="w-16 h-1 bg-blue-600 mb-6"></div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Started as an online retail store focus on digital printing and banking electronic equipment. A sole proprietor business.
                </p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Avidity Id deliver services and high quality physical products to businesses related to both marketing and security divisions (Bank related businesses).
                </p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-3 h-3 bg-blue-400 rounded-full mt-2"></div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Driven by discipline, passion, and outstanding commitment to our clients, we provide high quality services that may shock present day standard qualities. Our works have proven high satisfaction rate to all of our individuals, start ups and large companies clients worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Divider */}
        <div className="flex items-center justify-center mb-16">
          <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <div className="px-6">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          </div>
          <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>

        {/* Clients Section */}
        <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-50 rounded-full -ml-12 -mb-12"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Trusted Partners</h2>
              <p className="text-lg text-gray-600 mb-6">Companies and organizations that trust us with their business</p>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "PT. GODWIN AUSTEN INDONESIA",
                "PT. SUGAKU KREATIF INDONESIA", 
                "PT. ANILO ADI KARYA",
                "PT. MUKTI INDO UTAMA",
                "PT. AIR SIRIH BERSINAR",
                "PT. TUJUH LANGIT SOLUSINDO",
                "PT. DELOITTE KONSULTAN INDONESIA",
                "PT. TORAY POLYTECH",
                "PT. RINTIS SEJAHTERA (JARINGAN PRIMA)",
                "PT. MITRANET SOFTWARE ONLINE",
                "PT. CLEVA CITRA PRIMA",
                "PT. GAMETRACO TUNGGAL",
                "PT. SWADHARMA DUTA DUTA (SDD)",
                "PT. BAHANA SUKSES SEJAHTERA",
                "PT. ASA MITRA MANDIRI",
                "IC INTELKOM BANDUNG",
                "PT. AJ Central Asia Raya (CAR Life Insurance)",
                "PT. BANK PERKREDITAN RAKYAT KARYAJATNIKA SADAYA (BPR KS)",
                "PT. BANK RAKYAT INDONESIA (BRI)",
                "JNE",
                "PODOMORO UNIVERSITY",
                "UNIVERSITAS PELITA HARAPAN (UPH)",
                "YAPENDIK GPIB",
                "INSTITUT BIM INDONESIA",
                "PERSATUAN TERAPIS GIGI DAN MULUT INDONESIA (PTGMI)",
                "ALIANSI KABUPATEN KOTA PEDULI SANITASI (AKKOPSI)",
                "KIOSTIX.COM",
                "PT. SINAR REJEKI SELARAS",
                "PT. ALKINDO MITRARAYA",
                "PT. TITIPBELIIN GLOBAL INTERNASIONAL (TITIPBELIIN.COM)",
                "PT. MULTI NASIONAL PERKASA",
                "PT. INA BARAKA INDONESIA",
                "ANAHATTA ID",
                "OMEXX SPEED SHOP",
                "DJOERAGAN SPAREPART",
                "DX.SLUFF",
                "SMAN 46",
                "BARANGUNIK.CO",
                "KOPI JANJI JIWA",
                "KOPI EN'TOK",
                "NAIL BY MICHAELA",
                "BOX HOUSE",
                "BANTEN KIDS REVIVAL RAYON 3",
                "BIMBEL SMARTEDU",
                "GARUT FRESH SKINCARE",
                "PHENG XIANG TATTOOS",
                "TUMATA STUDIO",
                "TAKANA LAUNDRY",
                "MEL'Z ENGLISH COURSE",
                "ALLURE DURIO",
                "GRANDHILL PHOTOGRAPHY",
                "PONDOK PESANTREN AL-HIDAYAH AL MUMTAZAH",
                "YAYASAN PONDOK PESANTREN HUDAATUL UMAM",
                "YAYASAN SAWRO SARANA UMAT",
                "FINESTORE ID",
                "DM DECORATION & EVENT TANGERANG",
                "DIP-PROJECT.COM",
                "THE ORCHARD VILLAGE BEKASI BY SUNAN GROUP",
                "MUSTIKA AGENCY PROPERTY SYARIAH",
                "WAK DOYOK INDONESIA",
                "OTTOMAN'S COFFEE BREWERS",
                "KOPI YOR, KEDOYA"
              ].map((client, index) => (
                <div key={index} className="group p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full group-hover:bg-blue-500 transition-colors"></div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700 transition-colors leading-relaxed">{client}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 