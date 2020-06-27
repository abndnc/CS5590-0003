import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.css']
})
export class SearchRecipeComponent implements OnInit {
  @ViewChild('recipe') recipes: ElementRef;
  @ViewChild('place') places: ElementRef;
  // user input
  recipeValue: any;
  placeValue: any;
  venueList = []; // place search result will be stored in here
  recipeList = []; // recipe search result will be stored in here

  currentLat: any;
  currentLong: any;
  geolocationPosition: any;

  constructor(private _http: HttpClient) {
  }

  ngOnInit() {

    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.geolocationPosition = position;
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
      });
  }

  getVenues() {

    this.recipeValue = this.recipes.nativeElement.value;
    this.placeValue = this.places.nativeElement.value;

    if (this.recipeValue !== null) {
      // pass the recipe input into API EDAMAM url search
      this._http.get('https://api.edamam.com/search?q=' + this.recipeValue + '&app_id=109cd23a'
        + '&app_key=cb2e1a5e474d326ca9559a3acddf90d8').subscribe((response: any) => {
          // passing the results into recipeList
        this.recipeList = Object.keys(response.hits).map(function (R) {
          const recipe = response.hits[R].recipe;
          return {
            name: recipe.label,
            icon: recipe.image,
            url: recipe.url};
        });
        console.log(response.hits);
      });
    }


    if (this.placeValue != null && this.placeValue !== '' && this.recipeValue != null && this.recipeValue !== '') {
      // pass the place input into API FOURSQUARE url search
      this._http.get('https://api.foursquare.com/v2/venues/search?' + '&client_id=JYY2DAATTZHLIBMI4B5TTDCOKPACRK4MHBFBQZX2FUWO1IZT'
        + '&client_secret=0DJSFD4XGK4QWTPHXHOSCOFDV2YBNSXNR0J4UK23TJSBUIZ4' + '&v=20190928' + '&limit=10' + '&near= ' + this.placeValue
        + '&query =' + this.recipeValue).subscribe((response: any) => {
          // passing the results into venueList
        this.venueList = Object.keys(response.response.venues).map(function (P) {
          const place = response.response.venues[P];
          return {
            name: place.name,
            formattedAddress: place.location.formattedAddress};
        });
        console.log(response);
      });
    }
  }
}
