const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Directories
const ARTICLES_DIR = path.join(process.cwd(), 'content/articles');
const PRODUCTS_DIR = path.join(process.cwd(), 'content/downloads');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

let errors = [];
let warnings = [];

function validateArticles() {
  console.log('🔍 Validating articles...');
  
  if (!fs.existsSync(ARTICLES_DIR)) {
    warnings.push('Articles directory does not exist');
    return;
  }

  const files = fs.readdirSync(ARTICLES_DIR).filter(file => file.endsWith('.md'));
  
  if (files.length === 0) {
    warnings.push('No markdown files found in articles directory');
    return;
  }

  files.forEach(file => {
    try {
      const filePath = path.join(ARTICLES_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);

      // Required fields
      const requiredFields = ['title', 'date', 'category'];
      const missingFields = requiredFields.filter(field => !data[field]);
      
      if (missingFields.length > 0) {
        errors.push(`Article "${file}": Missing required fields: ${missingFields.join(', ')}`);
      }

      // Validate date format
      if (data.date && !isValidDate(data.date)) {
        errors.push(`Article "${file}": Invalid date format "${data.date}". Use YYYY-MM-DD format.`);
      }

      // Check for empty content
      if (!content.trim()) {
        warnings.push(`Article "${file}": Content is empty`);
      }

      // Validate featured image exists
      if (data.featured_image) {
        const imagePath = path.join(PUBLIC_DIR, data.featured_image);
        if (!fs.existsSync(imagePath)) {
          errors.push(`Article "${file}": Featured image not found: ${data.featured_image}`);
        }
      }

      // Validate tags array
      if (data.tags && !Array.isArray(data.tags)) {
        errors.push(`Article "${file}": Tags must be an array`);
      }

      console.log(`✅ Validated article: ${file}`);
    } catch (error) {
      errors.push(`Article "${file}": ${error.message}`);
    }
  });
}

function validateProducts() {
  console.log('🔍 Validating products...');
  
  if (!fs.existsSync(PRODUCTS_DIR)) {
    warnings.push('Products directory does not exist');
    return;
  }

  const files = fs.readdirSync(PRODUCTS_DIR).filter(file => file.endsWith('.json'));
  
  if (files.length === 0) {
    warnings.push('No JSON files found in products directory');
    return;
  }

  files.forEach(file => {
    try {
      const filePath = path.join(PRODUCTS_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const product = JSON.parse(fileContent);

      // Required fields
      const requiredFields = ['id', 'title', 'description', 'price', 'category'];
      const missingFields = requiredFields.filter(field => !product[field]);
      
      if (missingFields.length > 0) {
        errors.push(`Product "${file}": Missing required fields: ${missingFields.join(', ')}`);
      }

      // Validate price
      if (product.price && (isNaN(product.price) || product.price < 0)) {
        errors.push(`Product "${file}": Invalid price "${product.price}". Must be a positive number.`);
      }

      // Validate license
      const validLicenses = ['single-use', 'multiple-use', 'commercial'];
      if (product.license && !validLicenses.includes(product.license)) {
        errors.push(`Product "${file}": Invalid license "${product.license}". Must be one of: ${validLicenses.join(', ')}`);
      }

      // Validate preview images exist
      if (product.preview_images && Array.isArray(product.preview_images)) {
        product.preview_images.forEach(imagePath => {
          const fullPath = path.join(PUBLIC_DIR, imagePath);
          if (!fs.existsSync(fullPath)) {
            errors.push(`Product "${file}": Preview image not found: ${imagePath}`);
          }
        });
      }

      // Validate download files exist
      if (product.download_files && Array.isArray(product.download_files)) {
        product.download_files.forEach(filePath => {
          const fullPath = path.join(PUBLIC_DIR, 'downloads', filePath);
          if (!fs.existsSync(fullPath)) {
            warnings.push(`Product "${file}": Download file not found: ${filePath}`);
          }
        });
      }

      // Validate dates
      if (product.created_at && !isValidDate(product.created_at)) {
        errors.push(`Product "${file}": Invalid created_at date format "${product.created_at}". Use YYYY-MM-DD format.`);
      }

      if (product.updated_at && !isValidDate(product.updated_at)) {
        errors.push(`Product "${file}": Invalid updated_at date format "${product.updated_at}". Use YYYY-MM-DD format.`);
      }

      // Validate tags array
      if (product.tags && !Array.isArray(product.tags)) {
        errors.push(`Product "${file}": Tags must be an array`);
      }

      console.log(`✅ Validated product: ${file}`);
    } catch (error) {
      errors.push(`Product "${file}": ${error.message}`);
    }
  });
}

function validateDirectoryStructure() {
  console.log('🔍 Validating directory structure...');
  
  const requiredDirs = [
    'src/app',
    'src/components',
    'src/lib',
    'src/utils',
    'src/types',
    'src/styles',
    'public/images',
    'public/downloads',
    'content',
    'data'
  ];

  requiredDirs.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(dirPath)) {
      warnings.push(`Directory missing: ${dir}`);
    }
  });
}

function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
}

function runValidation() {
  console.log('🚀 Starting content validation...\n');
  
  validateDirectoryStructure();
  validateArticles();
  validateProducts();
  
  console.log('\n📊 Validation Results:');
  console.log(`✅ Validation completed`);
  
  if (warnings.length > 0) {
    console.log(`\n⚠️  Warnings (${warnings.length}):`);
    warnings.forEach(warning => console.log(`   - ${warning}`));
  }
  
  if (errors.length > 0) {
    console.log(`\n❌ Errors (${errors.length}):`);
    errors.forEach(error => console.log(`   - ${error}`));
    console.log('\n🛑 Validation failed! Please fix the errors above.');
    process.exit(1);
  } else {
    console.log('\n🎉 All validations passed!');
  }
}

// Run validation
runValidation(); 