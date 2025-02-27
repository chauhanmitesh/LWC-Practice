import { LightningElement } from 'lwc';

export default class FavoriteProduct extends LightningElement {

    itemlst = [{id:1, Name:'Apple', Price:100, isFavorite: false, buttonLabel:'Unfavorite'},
               {id:2, Name:'Banana', Price:200, isFavorite: false, buttonLabel:'Unfavorite'},
               {id:3, Name:'Watermelon', Price:300, isFavorite: false, buttonLabel:'Unfavorite'}
              ]

    
    toggleFavorite(event){
        console.log(event.target.dataset);
        const productId = parseInt(event.target.dataset.id);
        this.itemlst = this.itemlst.map(product =>{
            if(product.id === productId){
                return {
                    ...product,
                    isFavorite : !product.isFavorite,
                    buttonLabel : product.isFavorite ? 'Favorite' : 'Unfavorite'
                };
            }

            return product;
        });
    }
}