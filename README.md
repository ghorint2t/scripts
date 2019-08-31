# Data grid view for gog.com store page

## Overview

This user script adds a third way to display games in the store view at [https://gog.com/games](https://gog.com/games). It works by downloading the entire catalogue data from gog and putting it in a [generic angular.js grid control](http://ui-grid.info/). This way, all the sorting and filtering can be done at client side, which greatly improves performance for the end user (although maybe not so for gog servers :)). The download size of the whole data is ~2.5MB.

![](https://github.com/ghorint2t/scripts/raw/master/doc/img/sale_sorting.jpg "Helpful sorting for large sales")

## Features

- Displays all games in a single grid (no more pages!)
- Sorting and filtering by (in any combination):
  * Bestselling rank
  * Title
  * Sub-genres
  * Developer/publisher
  * Release year
  * Operating system(s)
  * User rating
  * Discount
  * Current price
- Option to filter out DLCs
- Option to filter out owned games
- Integration with wishlist/cart from the store

## Details

- The game rank comes from 'all-time bestselling' list
- Genre filters support both limiting the search to certain sub-genres, or excluding them from the results. In both cases, multiple genres can be selected in either OR (default) or AND mode.
- Numeric filters (rank, year, rating, discount, price) support the following values:
  * a single specific number, eg. year "1995"
  * a range of numbers (including both ends), eg. years "1990-2000"
  * operator-value pairs, eg. discount ">=75", price "<10"
- For the price filter, the 0.01 rounding is taken into account when filtering, eg. both "10" and ">=10" filters will include 9.99 priced games.
- TBA games have their price internally set to -1 for purposes of sorting and filtering. Use "0.1-10" range filter instead of "<10" operator filter if you want to exclude the free/TBA games from your searches (doesn't affects the 'On Sale' tab, as free/TBA games are never discounted).

## Example filters

Cheap games:
![](https://github.com/ghorint2t/scripts/raw/master/doc/img/cheap_games.jpg "Low priced games on sale")

No more VNs!:
![](https://github.com/ghorint2t/scripts/raw/master/doc/img/genre_filter.jpg "Include/exclude genres")

The golden age of adventures:
![](https://github.com/ghorint2t/scripts/raw/master/doc/img/the_golden_age.jpg "Range filter")

Bestselling rank checking:
![](https://github.com/ghorint2t/scripts/raw/master/doc/img/rank_checking.jpg "Rank checking")

## Notes

It is possible for the catalog data download to cause the infamous 'wrong gog_lc cookie' (aka. 'Why my gog page is now in different language/currency?!?') bug. If that happens, add something to cart, go to checkout and back to fix. Or, if you are savvy with your browser's developer tools, manually edit gog_lc cookie to a correct value.

## Installation

The script requires either GreaseMonkey or TamperMonkey plugin in your browser. Once it's installed, navigate to the 
goggamesdatagridview.user.js file and click the 'Raw' button to add the script, or use [this direct link](https://github.com/ghorint2t/scripts/raw/master/goggamesdatagridview.user.js).
