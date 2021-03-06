import Product from '../models/product';
import imagesView from '../views/images_view';

export default {
  render(product: Product) {
    return {
      id: product.id,
      name: product.name,
      categoria: product.categoria,
      medida: product.medida,
      preco_final: product.preco_final,
      image: imagesView.render(product.image),
    };
  },
  renderMany(products: Product[]) {
    return products.map((product) => this.render(product));
  },
};
