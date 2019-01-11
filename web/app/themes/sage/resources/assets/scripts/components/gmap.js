/**
 * @example
 * <div data-gmap
 *   data-gmap-lat="{{lat}}"
 *   data-gmap-lng="{{lng}}"
 *   data-gmap-zoom="{{zoom?:15}}"
 *   data-gmap-marker="{{marker ? 'true' : 'false'}}">
 * </div>
 */
class GMapApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.callbackName = '_GoogleMapsApi.mapLoaded';
    if (!window._GoogleMapsApi) {
      window._GoogleMapsApi = this;
      window._GoogleMapsApi.mapLoaded = this.mapLoaded.bind(this);
    }
  }

  load() {
    if (!this.promise) {
      this.promise = new Promise(resolve => {
        this.resolve = resolve;
        if (typeof window.google === 'undefined') {
          const script = document.createElement('script');
          script.src = `//maps.googleapis.com/maps/api/js?key=${this.apiKey}&callback=${this.callbackName}`;
          script.async = true;
          document.body.append(script);
        } else {
          this.resolve();
        }
      });
    }
    return this.promise;
  }

  mapLoaded() {
    if (this.resolve) {
      this.resolve();
    }
  }
}

class GMapComponent {
  constructor(el, gmapApi, options = {}) {
    this.api = gmapApi;
    this.el = el;
    this.$el = $(el);

    this.options = Object.assign({
      gmapLat: null,
      gmapLng: null,
      gmapZoom: 14,
      gmapMarker: false,
    }, options, this.$el.data());

    if (!this.options.gmapLat || !this.options.gmapLng) {
      throw new Error('Location missing');
    }

    this.position = {
      lat: this.options.gmapLat,
      lng: this.options.gmapLng,
    };

    this.api.load().then(this.init.bind(this));
  }

  init() {
    this.map = new window.google.maps.Map(this.el, {
      zoom: this.options.gmapZoom,
      center: this.position,
    });

    if (this.options.gmapMarker) {
      this.marker = new window.google.maps.Marker({
        position: this.position,
        map: this.map,
      });
    }
  }
}

export default function (selector, options = {}) {
  const $matches = $(selector);
  if ($matches.length && window.Sage.gmap_api_key) {
    const gmapApi = new GMapApi(window.Sage.gmap_api_key);

    $matches.each((i, el) => new GMapComponent(el, gmapApi, options));
  }
}
