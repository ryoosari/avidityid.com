const fs = require('fs');
const path = require('path');

// Directories
const PRODUCTS_DIR = path.join(process.cwd(), 'content/downloads');
const OUTPUT_DIR = path.join(process.cwd(), 'data');

// Ensure directories exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function processProducts() {
  console.log('🔄 Processing digital products...');
  
  const products = [];
  const categories = new Set();
  const tags = new Set();

  // Check if products directory exists
  if (!fs.existsSync(PRODUCTS_DIR)) {
    console.log('⚠️  Products directory not found. Creating sample structure...');
    fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
    
    // Create sample products
    const sampleProducts = [
      {
        id: 'modern-ui-kit',
        title: 'Modern UI Kit',
        description: 'A comprehensive UI kit with 50+ components for modern web design. Includes buttons, forms, navigation, cards, and more.',
        price: 29.99,
        currency: 'USD',
        category: 'Templates',
        tags: ['ui-kit', 'components', 'figma', 'sketch'],
        preview_images: [
          '/images/products/modern-ui-kit-preview-1.jpg',
          '/images/products/modern-ui-kit-preview-2.jpg'
        ],
        download_files: ['modern-ui-kit.zip'],
        license: 'multiple-use',
        featured: true,
        created_at: '2024-01-10',
        updated_at: '2024-01-10',
        file_size: '15.2 MB',
        format: 'Figma, Sketch, Adobe XD',
        requirements: ['Figma 2022+', 'Sketch 70+', 'Adobe XD 2021+']
      },
      {
        id: 'minimalist-icons',
        title: 'Minimalist Icon Set',
        description: 'Clean and minimal icon set with 200+ icons perfect for modern applications and websites.',
        price: 19.99,
        currency: 'USD',
        category: 'Icons',
        tags: ['icons', 'minimalist', 'svg', 'vector'],
        preview_images: [
          '/images/products/minimalist-icons-preview.jpg'
        ],
        download_files: ['minimalist-icons.zip'],
        license: 'commercial',
        featured: true,
        created_at: '2024-01-08',
        updated_at: '2024-01-08',
        file_size: '8.5 MB',
        format: 'SVG, PNG, AI',
        requirements: ['Vector graphics software recommended']
      },
      {
        id: 'brand-guidelines-template',
        title: 'Brand Guidelines Template',
        description: 'Professional brand guidelines template to showcase your brand identity with style.',
        price: 39.99,
        currency: 'USD',
        category: 'Templates',
        tags: ['branding', 'guidelines', 'template', 'indesign'],
        preview_images: [
          '/images/products/brand-guidelines-preview.jpg'
        ],
        download_files: ['brand-guidelines-template.zip'],
        license: 'single-use',
        featured: false,
        created_at: '2024-01-05',
        updated_at: '2024-01-05',
        file_size: '25.8 MB',
        format: 'InDesign, PDF',
        requirements: ['Adobe InDesign 2020+']
      }
    ];

    sampleProducts.forEach(product => {
      fs.writeFileSync(
        path.join(PRODUCTS_DIR, `${product.id}.json`),
        JSON.stringify(product, null, 2)
      );
    });
    
    console.log('✅ Created sample products');
  }

  // Read all JSON files
  const files = fs.readdirSync(PRODUCTS_DIR).filter(file => file.endsWith('.json'));

  if (files.length === 0) {
    console.log('⚠️  No JSON files found in products directory');
    return;
  }

  files.forEach(file => {
    try {
      const filePath = path.join(PRODUCTS_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const product = JSON.parse(fileContent);

      // Validate required fields
      const requiredFields = ['id', 'title', 'description', 'price', 'category'];
      const missingFields = requiredFields.filter(field => !product[field]);
      
      if (missingFields.length > 0) {
        console.error(`❌ Missing required fields in ${file}: ${missingFields.join(', ')}`);
        return;
      }

      // Set defaults
      const processedProduct = {
        id: product.id,
        title: product.title,
        description: product.description,
        price: parseFloat(product.price),
        currency: product.currency || 'USD',
        category: product.category,
        tags: product.tags || [],
        preview_images: product.preview_images || [],
        download_files: product.download_files || [],
        license: product.license || 'single-use',
        featured: product.featured || false,
        created_at: product.created_at || new Date().toISOString().split('T')[0],
        updated_at: product.updated_at || new Date().toISOString().split('T')[0],
        file_size: product.file_size,
        format: product.format,
        requirements: product.requirements || [],
        coming_soon: product.coming_soon || false
      };

      products.push(processedProduct);

      // Collect categories and tags
      categories.add(processedProduct.category);
      processedProduct.tags.forEach(tag => tags.add(tag));

      console.log(`✅ Processed: ${processedProduct.title}`);
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  });

  // Sort products by featured first, then by creation date
  products.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.created_at) - new Date(a.created_at);
  });

  // Write products data
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'products.json'),
    JSON.stringify(products, null, 2)
  );

  // Write categories
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'product-categories.json'),
    JSON.stringify(Array.from(categories).sort(), null, 2)
  );

  // Write tags
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'product-tags.json'),
    JSON.stringify(Array.from(tags).sort(), null, 2)
  );

  // Generate featured products
  const featuredProducts = products.filter(product => product.featured);
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'featured-products.json'),
    JSON.stringify(featuredProducts, null, 2)
  );

  console.log(`🎉 Processed ${products.length} products`);
  console.log(`⭐ Found ${featuredProducts.length} featured products`);
  console.log(`📂 Found ${categories.size} categories`);
  console.log(`🏷️  Found ${tags.size} tags`);
}

// Run the processing
processProducts(); 