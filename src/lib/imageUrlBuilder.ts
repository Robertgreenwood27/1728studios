// imageUrlBuilder.js
import imageUrlBuilder from '@sanity/image-url';
import sanityClient from '../lib/sanity';

const builder = imageUrlBuilder(sanityClient);

export default builder;
