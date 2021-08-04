# Data grid view for gog.com store page

## Overview

This user script adds a third way to display games in the store view at [https://gog.com/games](https://gog.com/games). It works by downloading the entire catalogue data from gog and putting it in a [generic angular.js grid control](http://ui-grid.info/). This way, all the sorting and filtering can be done at client side, which greatly improves performance for the end user (although maybe not so for gog servers :)). The download size of the whole data is ~3MB.

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
- Integration with wishlist/cart from the store, with a separate tab added for viewing (and sorting) your wishlist
- A blacklist of games that will be excluded from all searches
- Grid state (column widths, visibility, filters and blacklist) are saved in browser local storage between sessions
- Option to save and load the grid configuration (including blacklist) either to transfer your blacklist between browsers/devices, or to save your favorite filter setups
- Option to view the grid in full screen width

## Details

- The game rank comes from 'all-time bestselling' list
- Genre filters support both limiting the search to certain sub-genres, or excluding them from the results. In both cases, multiple genres can be selected in either OR (default) or AND mode.
- Numeric filters (rank, year, rating, discount, price) support the following values:
  * a single specific number, eg. year "1995"
  * a range of numbers (including both ends), eg. years "1990-2000"
  * operator-value pairs, eg. discount ">=75", price "<10"
- For the price filter, the 0.01 rounding is taken into account when filtering, eg. both "10" and ">=10" filters will include 9.99 priced games.
- TBA games have their price internally set to -1 for purposes of sorting and filtering. Use "0.1-10" range filter instead of "<10" operator filter if you want to exclude free/TBA games from your searches (doesn't affect 'On Sale' tab, as free/TBA games are never discounted).
- Thumbnail images can be turned on from 'Title' column's menu
- Blacklist is stored in local browser cache; to use the same list in another browser and/or device, use the save and load buttons below the grid.
- Blacklist is mutually exclusive with wishlist and cart. Blacklisting a game removes it from wishlist and cart, and vice-versa: adding a game to wishlist or cart removes it from blacklist.

## Example filters

Cheap games:
![](https://github.com/ghorint2t/scripts/raw/master/doc/img/cheap_games.jpg "Low priced games on sale")

No more VNs!:
![](https://github.com/ghorint2t/scripts/raw/master/doc/img/genre_filter.jpg "Include/exclude genres")

The golden age of adventures:
![](https://github.com/ghorint2t/scripts/raw/master/doc/img/the_golden_age.jpg "Range filter")

Bestselling rank checking:
![](https://github.com/ghorint2t/scripts/raw/master/doc/img/rank_checking.jpg "Rank checking")

Thumbnail images:
![](https://github.com/ghorint2t/scripts/raw/master/doc/img/colors.jpg "Colors")

## Notes

It is possible for the catalogue data download to cause the infamous 'wrong gog_lc cookie' (aka. 'Why my gog page is now in different language/currency?!?') bug. If that happens, add something to cart, go to checkout and back to fix. Or, if you are savvy with your browser's developer tools, manually edit gog_lc cookie to a correct value.

## Installation

The script requires either GreaseMonkey or TamperMonkey plugin in your browser. Once it's installed, navigate to the 
goggamesdatagridview.user.js file and click the 'Raw' button to add the script, or use [this direct link](https://github.com/ghorint2t/scripts/raw/master/goggamesdatagridview.user.js).

