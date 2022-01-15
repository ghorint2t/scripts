// ==UserScript==
// @name      GOG Games data grid view
// @namespace https://github.com/ghorint2t/scripts/
// @description Adds 'data grid' view to GOG store page, allowing multiple filtering and sorting options. 
// @author       Ghorin
// @updateURL    https://github.com/ghorint2t/scripts/raw/master/goggamesdatagridview.user.js
// @downloadURL  https://github.com/ghorint2t/scripts/raw/master/goggamesdatagridview.user.js
// @version   15
// @grant     unsafeWindow
// @grant     GM_addStyle
// @match     https://www.gog.com/games*
// @require   https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @run-at    document-start
// ==/UserScript==

var uigrid = `
/*!
 * ui-grid - v4.6.6 - 2018-11-16
 * Copyright (c) 2018 ; License: MIT 
 */


!function(){"use strict";angular.module("ui.grid.i18n",[]),angular.module("ui.grid",["ui.grid.i18n"])}(),function(){"use strict";angular.module("ui.grid").constant("uiGridConstants",{LOG_DEBUG_MESSAGES:!0,LOG_WARN_MESSAGES:!0,LOG_ERROR_MESSAGES:!0,CUSTOM_FILTERS:/CUSTOM_FILTERS/g,COL_FIELD:/COL_FIELD/g,MODEL_COL_FIELD:/MODEL_COL_FIELD/g,TOOLTIP:/title=\\"TOOLTIP\\"/g,DISPLAY_CELL_TEMPLATE:/DISPLAY_CELL_TEMPLATE/g,TEMPLATE_REGEXP:/<.+>/,FUNC_REGEXP:/(\\([^)]*\\))?\$/,DOT_REGEXP:/\\./g,APOS_REGEXP:/'/g,BRACKET_REGEXP:/^(.*)((?:\\s*\\[\\s*\\d+\\s*\\]\\s*)|(?:\\s*\\[\\s*"(?:[^"\\\\]|\\\\.)*"\\s*\\]\\s*)|(?:\\s*\\[\\s*'(?:[^'\\\\]|\\\\.)*'\\s*\\]\\s*))(.*)\$/,COL_CLASS_PREFIX:"ui-grid-col",ENTITY_BINDING:"\$\$this",events:{GRID_SCROLL:"uiGridScroll",COLUMN_MENU_SHOWN:"uiGridColMenuShown",ITEM_DRAGGING:"uiGridItemDragStart",COLUMN_HEADER_CLICK:"uiGridColumnHeaderClick"},keymap:{TAB:9,STRG:17,CAPSLOCK:20,CTRL:17,CTRLRIGHT:18,CTRLR:18,SHIFT:16,RETURN:13,ENTER:13,BACKSPACE:8,BCKSP:8,ALT:18,ALTR:17,ALTRIGHT:17,SPACE:32,WIN:91,MAC:91,FN:null,PG_UP:33,PG_DOWN:34,UP:38,DOWN:40,LEFT:37,RIGHT:39,ESC:27,DEL:46,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123},ASC:"asc",DESC:"desc",filter:{STARTS_WITH:2,ENDS_WITH:4,EXACT:8,CONTAINS:16,GREATER_THAN:32,GREATER_THAN_OR_EQUAL:64,LESS_THAN:128,LESS_THAN_OR_EQUAL:256,NOT_EQUAL:512,SELECT:"select",INPUT:"input"},aggregationTypes:{sum:2,count:4,avg:8,min:16,max:32},CURRENCY_SYMBOLS:["¤","؋","Ar","Ƀ","฿","B/.","Br","Bs.","Bs.F.","GH₵","¢","c","Ch.","₡","C\$","D","ден","دج",".د.ب","د.ع","JD","د.ك","ل.د","дин","د.ت","د.م.","د.إ","Db","\$","₫","Esc","€","ƒ","Ft","FBu","FCFA","CFA","Fr","FRw","G","gr","₲","h","₴","₭","Kč","kr","kn","MK","ZK","Kz","K","L","Le","лв","E","lp","M","KM","MT","₥","Nfk","₦","Nu.","UM","T\$","MOP\$","₱","Pt.","£","ج.م.","LL","LS","P","Q","q","R","R\$","ر.ع.","ر.ق","ر.س","៛","RM","p","Rf.","₹","₨","SRe","Rp","₪","Ksh","Sh.So.","USh","S/","SDR","сом","৳\\t","WS\$","₮","VT","₩","¥","zł"],scrollDirection:{UP:"up",DOWN:"down",LEFT:"left",RIGHT:"right",NONE:"none"},dataChange:{ALL:"all",EDIT:"edit",ROW:"row",COLUMN:"column",OPTIONS:"options"},scrollbars:{NEVER:0,ALWAYS:1,WHEN_NEEDED:2}})}(),angular.module("ui.grid").directive("uiGridCell",["\$compile","\$parse","gridUtil","uiGridConstants",function(l,e,a,s){return{priority:0,scope:!1,require:"?^uiGrid",compile:function(){return{pre:function(t,r,e,i){if(i&&t.col.compiledElementFn)(0,t.col.compiledElementFn)(t,function(e,t){r.append(e)});else if(i&&!t.col.compiledElementFn)t.col.getCompiledElementFn().then(function(e){e(t,function(e,t){r.append(e)})}).catch(angular.noop);else{var n=t.col.cellTemplate.replace(s.MODEL_COL_FIELD,"row.entity."+a.preEval(t.col.field)).replace(s.COL_FIELD,"grid.getCellValue(row, col)"),o=l(n)(t);r.append(o)}},post:function(i,n){var o,l=i.col.getColClass(!1);function a(e){var t=n;o&&(t.removeClass(o),o=null),o=angular.isFunction(i.col.cellClass)?i.col.cellClass(i.grid,i.row,i.col,i.rowRenderIndex,i.colRenderIndex):i.col.cellClass,t.addClass(o)}n.addClass(l),i.col.cellClass&&a();var e=i.grid.registerDataChangeCallback(a,[s.dataChange.COLUMN,s.dataChange.EDIT]);var t=i.\$watch("row",function(e,t){if(e!==t){(o||i.col.cellClass)&&a();var r=i.col.getColClass(!1);r!==l&&(n.removeClass(l),n.addClass(r),l=r)}});function r(){e(),t()}i.\$on("\$destroy",r),n.on("\$destroy",r)}}}}}]),angular.module("ui.grid").service("uiGridColumnMenuService",["i18nService","uiGridConstants","gridUtil",function(e,r,g){var i={initialize:function(e,t){e.grid=t.grid,(t.columnMenuScope=e).menuShown=!1},setColMenuItemWatch:function(t){var e=t.\$watch("col.menuItems",function(e){void 0!==e&&e&&angular.isArray(e)?(e.forEach(function(e){void 0!==e.context&&e.context||(e.context={}),e.context.col=t.col}),t.menuItems=t.defaultMenuItems.concat(e)):t.menuItems=t.defaultMenuItems});t.\$on("\$destroy",e)},sortable:function(e){return Boolean(e.grid.options.enableSorting&&void 0!==e.col&&e.col&&e.col.enableSorting)},isActiveSort:function(e,t){return Boolean(void 0!==e.col&&void 0!==e.col.sort&&void 0!==e.col.sort.direction&&e.col.sort.direction===t)},suppressRemoveSort:function(e){return Boolean(e.col&&e.col.suppressRemoveSort)},hideable:function(e){return!(void 0!==e.col&&e.col&&e.col.colDef&&!1===e.col.colDef.enableHiding)},getDefaultMenuItems:function(t){return[{title:function(){return e.getSafeText("sort.ascending")},icon:"ui-grid-icon-sort-alt-up",action:function(e){e.stopPropagation(),t.sortColumn(e,r.ASC)},shown:function(){return i.sortable(t)},active:function(){return i.isActiveSort(t,r.ASC)}},{title:function(){return e.getSafeText("sort.descending")},icon:"ui-grid-icon-sort-alt-down",action:function(e){e.stopPropagation(),t.sortColumn(e,r.DESC)},shown:function(){return i.sortable(t)},active:function(){return i.isActiveSort(t,r.DESC)}},{title:function(){return e.getSafeText("sort.remove")},icon:"ui-grid-icon-cancel",action:function(e){e.stopPropagation(),t.unsortColumn()},shown:function(){return i.sortable(t)&&void 0!==t.col&&void 0!==t.col.sort&&void 0!==t.col.sort.direction&&null!==t.col.sort.direction&&!i.suppressRemoveSort(t)}},{title:function(){return e.getSafeText("column.hide")},icon:"ui-grid-icon-cancel",shown:function(){return i.hideable(t)},action:function(e){e.stopPropagation(),t.hideColumn()}}]},getColumnElementPosition:function(e,t,r){var i={};return i.left=r[0].offsetLeft,i.top=r[0].offsetTop,i.parentLeft=r[0].offsetParent.offsetLeft,i.offset=0,t.grid.options.offsetLeft&&(i.offset=t.grid.options.offsetLeft),i.height=g.elementHeight(r,!0),i.width=g.elementWidth(r,!0),i},repositionMenu:function(e,t,r,i,n){var o=i[0].querySelectorAll(".ui-grid-menu"),l=g.closestElm(n,".ui-grid-render-container"),a=l.getBoundingClientRect().left-e.grid.element[0].getBoundingClientRect().left,s=l.querySelectorAll(".ui-grid-viewport")[0].scrollLeft,d=g.elementWidth(o,!0),c=t.lastMenuPaddingRight?t.lastMenuPaddingRight:e.lastMenuPaddingRight?e.lastMenuPaddingRight:10;0!==o.length&&0!==o[0].querySelectorAll(".ui-grid-menu-mid").length&&(c=parseInt(g.getStyles(angular.element(o)[0]).paddingRight,10),e.lastMenuPaddingRight=c,t.lastMenuPaddingRight=c);var u=r.left+a-s+r.parentLeft+r.width+c;u<r.offset+d&&(u=Math.max(r.left-s+r.parentLeft-c+d,r.offset+d)),i.css("left",u+"px"),i.css("top",r.top+r.height+"px")}};return i}]).directive("uiGridColumnMenu",["\$timeout","gridUtil","uiGridConstants","uiGridColumnMenuService","\$document",function(r,n,l,a,s){return{priority:0,scope:!0,require:"^uiGrid",templateUrl:"ui-grid/uiGridColumnMenu",replace:!0,link:function(o,i,e,t){a.initialize(o,t),o.defaultMenuItems=a.getDefaultMenuItems(o),o.menuItems=o.defaultMenuItems,a.setColMenuItemWatch(o),o.showMenu=function(e,t,r){o.col=e;var i=a.getColumnElementPosition(o,e,t);o.menuShown?(o.colElement=t,o.colElementPosition=i,o.hideThenShow=!0,o.\$broadcast("hide-menu",{originalEvent:r})):(o.menuShown=!0,o.colElement=t,o.colElementPosition=i,o.\$broadcast("show-menu",{originalEvent:r}))},o.hideMenu=function(e){o.menuShown=!1,e||o.\$broadcast("hide-menu")},o.\$on("menu-hidden",function(){var e=angular.element(i[0].querySelector(".ui-grid-menu-items"))[0];i[0].removeAttribute("style"),o.hideThenShow?(delete o.hideThenShow,o.\$broadcast("show-menu"),o.menuShown=!0):(o.hideMenu(!0),o.col&&n.focus.bySelector(s,".ui-grid-header-cell."+o.col.getColClass()+" .ui-grid-column-menu-button",o.col.grid,!1)),e&&(e.onkeydown=null,angular.forEach(e.children,function(e){e.onkeydown=null}))}),o.\$on("menu-shown",function(){r(function(){a.repositionMenu(o,o.col,o.colElementPosition,i,o.colElement),n.focus.bySelector(s,".ui-grid-menu-items .ui-grid-menu-item:not(.ng-hide)",!0),delete o.colElementPosition,delete o.columnElement,function(){var e,t=angular.element(i[0].querySelector(".ui-grid-menu-items"))[0],n=[];function r(e,t,r,i){e.keyCode===l.keymap.TAB&&(t?e.preventDefault():r&&(e.preventDefault(),n[i].focus()))}t&&(t.onkeydown=function(e){e.keyCode===l.keymap.ESC&&(e.preventDefault(),o.hideMenu())},e=t.querySelectorAll(".ui-grid-menu-item:not(.ng-hide)"),angular.forEach(e,function(e){null!==e.offsetParent&&this.push(e)},n),n.length&&(1===n.length?n[0].onkeydown=function(e){r(e,!0)}:(n[0].onkeydown=function(e){r(e,!1,e.shiftKey,n.length-1)},n[n.length-1].onkeydown=function(e){r(e,!1,!e.shiftKey,0)})))}()})}),o.sortColumn=function(e,t){e.stopPropagation(),o.grid.sortColumn(o.col,t,!0).then(function(){o.grid.refresh(),o.hideMenu()}).catch(angular.noop)},o.unsortColumn=function(){o.col.unsort(),o.grid.refresh(),o.hideMenu()},o.hideColumn=function(){o.col.colDef.visible=!1,o.col.visible=!1,o.grid.queueGridRefresh(),o.hideMenu(),o.grid.api.core.notifyDataChange(l.dataChange.COLUMN),o.grid.api.core.raise.columnVisibilityChanged(o.col),r(function(){var r,i,t=function(){return n.focus.byId("grid-menu",o.grid)};if(o.grid.columns.some(function(e,t){if(angular.equals(e,o.col))return r=t,!0}),o.grid.columns.some(function(e,t){if(!e.visible)return!1;if(t<r)i=e;else{if(r<t&&!i)return i=e,!0;if(r<t&&i)return!0}}),i){var e=i.getColClass();n.focus.bySelector(s,".ui-grid-header-cell."+e+" .ui-grid-header-cell-primary-focus",!0).then(angular.noop,function(e){if("canceled"!==e)return t()}).catch(angular.noop)}else t()})}},controller:["\$scope",function(e){var t=this;e.\$watch("menuItems",function(e){t.menuItems=e})}]}}]),function(){"use strict";angular.module("ui.grid").directive("uiGridFilter",["\$compile","\$templateCache","i18nService","gridUtil",function(n,e,t,i){return{compile:function(){return{pre:function(r,i){r.col.updateFilters=function(e){if(i.children().remove(),e){var t=r.col.filterHeaderTemplate;void 0===t&&""!==r.col.providedFilterHeaderTemplate?r.col.filterHeaderTemplatePromise&&r.col.filterHeaderTemplatePromise.then(function(){t=r.col.filterHeaderTemplate,i.append(n(t)(r))}):i.append(n(t)(r))}},r.\$on("\$destroy",function(){delete r.col.updateFilters})},post:function(e,r){e.aria=t.getSafeText("headerCell.aria"),e.removeFilter=function(e,t){e.term=null,i.focus.bySelector(r,".ui-grid-filter-input-"+t)}}}}}}])}(),function(){"use strict";angular.module("ui.grid").directive("uiGridFooterCell",["\$timeout","gridUtil","uiGridConstants","\$compile",function(e,t,s,i){return{priority:0,scope:{col:"=",row:"=",renderIndex:"="},replace:!0,require:"^uiGrid",compile:function(){return{pre:function(e,t){var r=e.col.footerCellTemplate;void 0===r&&""!==e.col.providedFooterCellTemplate?e.col.footerCellTemplatePromise&&e.col.footerCellTemplatePromise.then(function(){r=e.col.footerCellTemplate,t.append(i(r)(e))}):t.append(i(r)(e))},post:function(t,r,e,i){t.grid=i.grid;var n,o=t.col.getColClass(!1);r.addClass(o);var l=function(){var e=r;n&&(e.removeClass(n),n=null),n=angular.isFunction(t.col.footerCellClass)?t.col.footerCellClass(t.grid,t.row,t.col,t.rowRenderIndex,t.colRenderIndex):t.col.footerCellClass,e.addClass(n)};t.col.footerCellClass&&l(),t.col.updateAggregationValue();var a=t.grid.registerDataChangeCallback(l,[s.dataChange.COLUMN]);t.grid.api.core.on.rowsRendered(t,t.col.updateAggregationValue),t.grid.api.core.on.rowsRendered(t,l),t.\$on("\$destroy",a)}}}}}])}(),function(){"use strict";angular.module("ui.grid").directive("uiGridFooter",["\$templateCache","\$compile","uiGridConstants","gridUtil","\$timeout",function(e,a,t,s,r){return{restrict:"EA",replace:!0,require:["^uiGrid","^uiGridRenderContainer"],scope:!0,compile:function(e,t){return{pre:function(n,o,e,t){var r=t[0],l=t[1];n.grid=r.grid,n.colContainer=l.colContainer,l.footer=o;var i=n.grid.options.footerTemplate;s.getTemplate(i).then(function(e){var t=angular.element(e),r=a(t)(n);if(o.append(r),l){var i=o[0].getElementsByClassName("ui-grid-footer-viewport")[0];i&&(l.footerViewport=i)}}).catch(angular.noop)},post:function(e,t,r,i){var n=i[0],o=i[1];n.grid;s.disableAnimations(t);var l=(o.footer=t)[0].getElementsByClassName("ui-grid-footer-viewport")[0];l&&(o.footerViewport=l)}}}}}])}(),function(){"use strict";angular.module("ui.grid").directive("uiGridGridFooter",["\$templateCache","\$compile","uiGridConstants","gridUtil",function(e,o,t,l){return{restrict:"EA",replace:!0,require:"^uiGrid",scope:!0,compile:function(){return{pre:function(i,n,e,t){i.grid=t.grid;var r=i.grid.options.gridFooterTemplate;l.getTemplate(r).then(function(e){var t=angular.element(e),r=o(t)(i);n.append(r)}).catch(angular.noop)}}}}}])}(),function(){"use strict";angular.module("ui.grid").directive("uiGridHeaderCell",["\$compile","\$timeout","\$window","\$document","gridUtil","uiGridConstants","ScrollEvent","i18nService",function(i,h,e,p,t,f,r,m){return{priority:0,scope:{col:"=",row:"=",renderIndex:"="},require:["^uiGrid","^uiGridRenderContainer"],replace:!0,compile:function(){return{pre:function(e,t){var r=e.col.headerCellTemplate;void 0===r&&""!==e.col.providedHeaderCellTemplate?e.col.headerCellTemplatePromise&&e.col.headerCellTemplatePromise.then(function(){r=e.col.headerCellTemplate,t.append(i(r)(e))}):t.append(i(r)(e))},post:function(r,i,e,t){var n=t[0],o=t[1];r.i18n={headerCell:m.getSafeText("headerCell"),sort:m.getSafeText("sort")},r.isSortPriorityVisible=function(){return r.col&&r.col.sort&&angular.isNumber(r.col.sort.priority)&&r.grid.columns.some(function(e,t){return angular.isNumber(e.sort.priority)&&e!==r.col})},r.getSortDirectionAriaLabel=function(){var e=r.col,t=e.sort&&e.sort.direction===f.ASC?r.i18n.sort.ascending:e.sort&&e.sort.direction===f.DESC?r.i18n.sort.descending:r.i18n.sort.none;return r.isSortPriorityVisible()&&(t=t+". "+r.i18n.headerCell.priority+" "+(e.sort.priority+1)),t},r.grid=n.grid,r.renderContainer=n.grid.renderContainers[o.containerId];var l=r.col.getColClass(!1);i.addClass(l),r.menuShown=!1,r.asc=f.ASC,r.desc=f.DESC;var a,s,d=angular.element(i[0].querySelectorAll(".ui-grid-cell-contents")),c=[];r.downFn=function(e){e.stopPropagation(),void 0!==e.originalEvent&&void 0!==e.originalEvent&&(e=e.originalEvent),e.button&&0!==e.button||(s=e.pageX,r.mousedownStartTime=(new Date).getTime(),r.mousedownTimeout=h(function(){},500),r.mousedownTimeout.then(function(){r.colMenu&&n.columnMenuScope.showMenu(r.col,i,e)}).catch(angular.noop),n.fireEvent(f.events.COLUMN_HEADER_CLICK,{event:e,columnName:r.col.colDef.name}),r.offAllEvents(),"touchstart"===e.type?(p.on("touchend",r.upFn),p.on("touchmove",r.moveFn)):"mousedown"===e.type&&(p.on("mouseup",r.upFn),p.on("mousemove",r.moveFn)))},r.upFn=function(e){e.stopPropagation(),h.cancel(r.mousedownTimeout),r.offAllEvents(),r.onDownEvents(e.type),500<(new Date).getTime()-r.mousedownStartTime||r.sortable&&r.handleClick(e)},r.handleKeyDown=function(e){32===e.keyCode&&e.preventDefault()},r.moveFn=function(e){0!==e.pageX-s&&(h.cancel(r.mousedownTimeout),r.offAllEvents(),r.onDownEvents(e.type))},r.clickFn=function(e){e.stopPropagation(),d.off("click",r.clickFn)},r.offAllEvents=function(){d.off("touchstart",r.downFn),d.off("mousedown",r.downFn),p.off("touchend",r.upFn),p.off("mouseup",r.upFn),p.off("touchmove",r.moveFn),p.off("mousemove",r.moveFn),d.off("click",r.clickFn)},r.onDownEvents=function(e){switch(e){case"touchmove":case"touchend":d.on("click",r.clickFn),d.on("touchstart",r.downFn),h(function(){d.on("mousedown",r.downFn)},500);break;case"mousemove":case"mouseup":d.on("click",r.clickFn),d.on("mousedown",r.downFn),h(function(){d.on("touchstart",r.downFn)},500);break;default:d.on("click",r.clickFn),d.on("touchstart",r.downFn),d.on("mousedown",r.downFn)}};var u=function(){var e=i;a&&(e.removeClass(a),a=null),a=angular.isFunction(r.col.headerCellClass)?r.col.headerCellClass(r.grid,r.row,r.col,r.rowRenderIndex,r.colRenderIndex):r.col.headerCellClass,e.addClass(a),r.\$applyAsync(function(){var e=r.grid.renderContainers.right&&r.grid.renderContainers.right.visibleColumnCache.length?r.grid.renderContainers.right:r.grid.renderContainers.body;r.isLastCol=n.grid.options&&n.grid.options.enableGridMenu&&r.col===e.visibleColumnCache[e.visibleColumnCache.length-1]}),r.sortable=Boolean(r.col.enableSorting);var t=r.filterable;r.filterable=Boolean(n.grid.options.enableFiltering&&r.col.enableFiltering),t!==r.filterable&&(void 0!==r.col.updateFilters&&r.col.updateFilters(r.filterable),r.filterable?(r.col.filters.forEach(function(e,t){c.push(r.\$watch("col.filters["+t+"].term",function(e,t){e!==t&&(n.grid.api.core.raise.filterChanged(),n.grid.api.core.notifyDataChange(f.dataChange.COLUMN),n.grid.queueGridRefresh())}))}),r.\$on("\$destroy",function(){c.forEach(function(e){e()})})):c.forEach(function(e){e()})),r.colMenu=r.col.grid.options&&!1!==r.col.grid.options.enableColumnMenus&&r.col.colDef&&!1!==r.col.colDef.enableColumnMenu,r.offAllEvents(),(r.sortable||r.colMenu)&&(r.onDownEvents(),r.\$on("\$destroy",function(){r.offAllEvents()}))};u();var g=r.grid.registerDataChangeCallback(u,[f.dataChange.COLUMN]);r.\$on("\$destroy",g),r.handleClick=function(e){var t=!1;e.shiftKey&&(t=!0),n.grid.sortColumn(r.col,t).then(function(){n.columnMenuScope&&n.columnMenuScope.hideMenu(),n.grid.refresh()}).catch(angular.noop)},r.headerCellArrowKeyDown=function(e){32!==e.keyCode&&13!==e.keyCode||(e.preventDefault(),r.toggleMenu(e))},r.toggleMenu=function(e){e.stopPropagation(),n.columnMenuScope.menuShown&&n.columnMenuScope.col===r.col?n.columnMenuScope.hideMenu():n.columnMenuScope.showMenu(r.col,i)}}}}}}])}(),function(){"use strict";angular.module("ui.grid").directive("uiGridHeader",["\$templateCache","\$compile","uiGridConstants","gridUtil","\$timeout","ScrollEvent",function(e,d,t,c,r,u){return{restrict:"EA",replace:!0,require:["^uiGrid","^uiGridRenderContainer"],scope:!0,compile:function(){return{pre:function(n,o,e,t){var r,i=t[0],l=t[1];function a(){l.header=l.colContainer.header=o;var e=o[0].getElementsByClassName("ui-grid-header-canvas");0<e.length?l.headerCanvas=l.colContainer.headerCanvas=e[0]:l.headerCanvas=null}function s(){if(!i.grid.isScrollingHorizontally){var e=c.normalizeScrollLeft(l.headerViewport,i.grid),t=l.colContainer.scrollHorizontal(e),r=new u(i.grid,null,l.colContainer,u.Sources.ViewPortScroll);r.newScrollLeft=e,-1<t&&(r.x={percentage:t}),i.grid.scrollContainers(null,r)}}n.grid=i.grid,n.colContainer=l.colContainer,a(),r=n.grid.options.showHeader?n.grid.options.headerTemplate?n.grid.options.headerTemplate:"ui-grid/ui-grid-header":"ui-grid/ui-grid-no-header",c.getTemplate(r).then(function(e){var t=angular.element(e),r=d(t)(n);if(o.replaceWith(r),o=r,a(),l){var i=o[0].getElementsByClassName("ui-grid-header-viewport")[0];i&&(l.headerViewport=i,angular.element(i).on("scroll",s),n.\$on("\$destroy",function(){angular.element(i).off("scroll",s)}))}n.grid.queueRefresh()}).catch(angular.noop)},post:function(e,t,r,i){var n=i[0],o=i[1];n.grid;c.disableAnimations(t);var l=(o.header=t)[0].getElementsByClassName("ui-grid-header-viewport")[0];l&&(o.headerViewport=l),n&&n.grid.registerStyleComputation({priority:15,func:function(){var e=o.colContainer.visibleColumnCache,t="",r=0;return e.forEach(function(e){t+=e.getColClassDefinition(),r+=e.drawnWidth}),o.colContainer.canvasWidth=r,t}})}}}}}])}(),angular.module("ui.grid").service("uiGridGridMenuService",["gridUtil","i18nService","uiGridConstants",function(n,l,t){var a={initialize:function(e,t){(t.gridMenuScope=e).grid=t,e.registeredMenuItems=[],e.\$on("\$destroy",function(){e.grid&&e.grid.gridMenuScope&&(e.grid.gridMenuScope=null),e.grid&&(e.grid=null),e.registeredMenuItems&&(e.registeredMenuItems=null)}),e.registeredMenuItems=[],t.api.registerMethod("core","addToGridMenu",a.addToGridMenu),t.api.registerMethod("core","removeFromGridMenu",a.removeFromGridMenu)},addToGridMenu:function(e,t){angular.isArray(t)?e.gridMenuScope?(e.gridMenuScope.registeredMenuItems=e.gridMenuScope.registeredMenuItems?e.gridMenuScope.registeredMenuItems:[],e.gridMenuScope.registeredMenuItems=e.gridMenuScope.registeredMenuItems.concat(t)):n.logError("Asked to addToGridMenu, but gridMenuScope not present.  Timing issue?  Please log issue with ui-grid"):n.logError("addToGridMenu: menuItems must be an array, and is not, not adding any items")},removeFromGridMenu:function(e,r){var i=-1;e&&e.gridMenuScope&&e.gridMenuScope.registeredMenuItems.forEach(function(e,t){e.id===r&&(-1<i?n.logError("removeFromGridMenu: found multiple items with the same id, removing only the last"):i=t)}),-1<i&&e.gridMenuScope.registeredMenuItems.splice(i,1)},getMenuItems:function(t){var e=[];t.grid.options.gridMenuCustomItems&&(angular.isArray(t.grid.options.gridMenuCustomItems)?e=e.concat(t.grid.options.gridMenuCustomItems):n.logError("gridOptions.gridMenuCustomItems must be an array, and is not"));var r=[{title:l.getSafeText("gridMenu.clearAllFilters"),action:function(e){t.grid.clearAllFilters()},shown:function(){return t.grid.options.enableFiltering},order:100}];return e=(e=e.concat(r)).concat(t.registeredMenuItems),!1!==t.grid.options.gridMenuShowHideColumns&&(e=e.concat(a.showHideColumns(t))),e.sort(function(e,t){return e.order-t.order}),e},showHideColumns:function(i){var n=[];if(!i.grid.options.columnDefs||0===i.grid.options.columnDefs.length||0===i.grid.columns.length)return n;function o(e){return!0===(t=e).visible||void 0===t.visible?"ui-grid-icon-ok":"ui-grid-icon-cancel";var t}return n.push({title:l.getSafeText("gridMenu.columns"),order:300,templateUrl:"ui-grid/ui-grid-menu-header-item"}),i.grid.options.gridMenuTitleFilter=i.grid.options.gridMenuTitleFilter?i.grid.options.gridMenuTitleFilter:function(e){return e},i.grid.options.columnDefs.forEach(function(e,t){if(!1!==e.enableHiding){var r={icon:o(e),action:function(e){e.stopPropagation(),a.toggleColumnVisibility(this.context.gridCol),e.target&&e.target.firstChild&&("I"===angular.element(e.target)[0].nodeName?e.target.className=o(this.context.gridCol.colDef):e.target.firstChild.className=o(this.context.gridCol.colDef))},shown:function(){return!1!==this.context.gridCol.colDef.enableHiding},context:{gridCol:i.grid.getColumn(e.name||e.field)},leaveOpen:!0,order:301+t};a.setMenuItemTitle(r,e,i.grid),n.push(r)}}),n},setMenuItemTitle:function(t,e,r){var i=r.options.gridMenuTitleFilter(e.displayName||n.readableColumnName(e.name)||e.field);"string"==typeof i?t.title=i:i.then?(t.title="",i.then(function(e){t.title=e},function(e){t.title=e}).catch(angular.noop)):(n.logError("Expected gridMenuTitleFilter to return a string or a promise, it has returned neither, bad config"),t.title="badconfig")},toggleColumnVisibility:function(e){e.colDef.visible=!(!0===e.colDef.visible||void 0===e.colDef.visible),e.grid.refresh(),e.grid.api.core.notifyDataChange(t.dataChange.COLUMN),e.grid.api.core.raise.columnVisibilityChanged(e)}};return a}]).directive("uiGridMenuButton",["gridUtil","uiGridConstants","uiGridGridMenuService","i18nService",function(o,e,l,a){return{priority:0,scope:!0,require:["^uiGrid"],templateUrl:"ui-grid/ui-grid-menu-button",replace:!0,link:function(e,t,r,i){var n=i[0];e.i18n={aria:a.getSafeText("gridMenu.aria")},l.initialize(e,n.grid),e.shown=!1,e.toggleMenu=function(){e.shown?(e.\$broadcast("hide-menu"),e.shown=!1):(e.menuItems=l.getMenuItems(e),e.\$broadcast("show-menu"),e.shown=!0)},e.\$on("menu-hidden",function(){e.shown=!1,o.focus.bySelector(t,".ui-grid-icon-container")})}}}]),angular.module("ui.grid").directive("uiGridMenu",["\$compile","\$timeout","\$window","\$document","gridUtil","uiGridConstants","i18nService",function(d,c,u,e,g,h,p){return{priority:0,scope:{menuItems:"=",autoHide:"=?"},require:"?^uiGrid",templateUrl:"ui-grid/uiGridMenu",replace:!1,link:function(i,o,e,r){if(i.dynamicStyles="",r&&r.grid&&r.grid.options&&r.grid.options.gridMenuTemplate){var t=r.grid.options.gridMenuTemplate;g.getTemplate(t).then(function(e){var t=angular.element(e),r=d(t)(i);o.replaceWith(r)}).catch(angular.noop)}var n=function(e){var t=e-r.grid.headerHeight-20;i.dynamicStyles=[".grid"+r.grid.id+" .ui-grid-menu-mid {","max-height: "+t+"px;","}"].join(" ")};r&&(n(r.grid.gridHeight),r.grid.api.core.on.gridDimensionChanged(i,function(e,t,r,i){n(r)})),i.i18n={close:p.getSafeText("columnMenu.close")},i.showMenu=function(e,t){i.shown?i.shownMid||(i.shownMid=!0,i.\$emit("menu-shown")):(i.shown=!0,c(function(){i.shownMid=!0,i.\$emit("menu-shown")}));var r="click";t&&t.originalEvent&&t.originalEvent.type&&"touchstart"===t.originalEvent.type&&(r=t.originalEvent.type),angular.element(document).off("click touchstart",l),o.off("keyup",a),o.off("keydown",s),c(function(){angular.element(document).on(r,l),o.on("keyup",a),o.on("keydown",s)})},i.hideMenu=function(e){i.shown&&(i.shownMid=!1,c(function(){i.shownMid||(i.shown=!1,i.\$emit("menu-hidden"))},40)),angular.element(document).off("click touchstart",l),o.off("keyup",a),o.off("keydown",s)},i.\$on("hide-menu",function(e,t){i.hideMenu(e,t)}),i.\$on("show-menu",function(e,t){i.showMenu(e,t)});var l=function(){i.shown&&i.\$apply(function(){i.hideMenu()})},a=function(e){27===e.keyCode&&i.hideMenu()},s=function(t){var e=function(e){return e.focus(),t.preventDefault(),!1};if(9===t.keyCode){var r,i,n=o[0].querySelectorAll("button:not(.ng-hide)");0<n.length&&(r=n[0],i=n[n.length-1],t.target!==i||t.shiftKey?t.target===r&&t.shiftKey&&e(i):e(r))}};void 0!==i.autoHide&&void 0!==i.autoHide||(i.autoHide=!0),i.autoHide&&angular.element(u).on("resize",l),i.\$on("\$destroy",function(){angular.element(u).off("resize",l),angular.element(document).off("click touchstart",l),o.off("keyup",a),o.off("keydown",s)}),r&&i.\$on("\$destroy",r.grid.api.core.on.scrollBegin(i,l)),i.\$on("\$destroy",i.\$on(h.events.ITEM_DRAGGING,l))}}}]).directive("uiGridMenuItem",["gridUtil","\$compile","i18nService",function(l,o,i){return{priority:0,scope:{name:"=",active:"=",action:"=",icon:"=",shown:"=",context:"=",templateUrl:"=",leaveOpen:"=",screenReaderOnly:"="},require:["?^uiGrid"],templateUrl:"ui-grid/uiGridMenuItem",replace:!1,compile:function(){return{pre:function(i,n){i.templateUrl&&l.getTemplate(i.templateUrl).then(function(e){var t=angular.element(e),r=o(t)(i);n.replaceWith(r)}).catch(angular.noop)},post:function(n,e,t,r){var o=r[0];void 0!==n.shown&&null!==n.shown||(n.shown=function(){return!0}),n.itemShown=function(){var e={};return n.context&&(e.context=n.context),void 0!==o&&o&&(e.grid=o.grid),n.shown.call(e)},n.itemAction=function(e,t){if(e.stopPropagation(),"function"==typeof n.action){var r={};if(n.context&&(r.context=n.context),void 0!==o&&o&&(r.grid=o.grid),n.action.call(r,e,t),n.leaveOpen){var i=e.target.parentElement;"I"===angular.element(e.target)[0].nodeName&&(i=i.parentElement),l.focus.bySelector(i,"button[type=button]",!0)}else n.\$emit("hide-menu")}},n.label=function(){var e=n.name;return"function"==typeof n.name&&(e=n.name.call()),e},n.i18n=i.get()}}}}}]),function(){"use strict";var t=angular.module("ui.grid");angular.forEach([{tag:"Src",method:"attr"},{tag:"Text",method:"text"},{tag:"Href",method:"attr"},{tag:"Class",method:"addClass"},{tag:"Html",method:"html"},{tag:"Alt",method:"attr"},{tag:"Style",method:"css"},{tag:"Value",method:"attr"},{tag:"Id",method:"attr"},{tag:"Id",directiveName:"IdGrid",method:"attr",appendGridId:!0},{tag:"Title",method:"attr"},{tag:"Label",method:"attr",aria:!0},{tag:"Labelledby",method:"attr",aria:!0},{tag:"Labelledby",directiveName:"LabelledbyGrid",appendGridId:!0,method:"attr",aria:!0},{tag:"Describedby",method:"attr",aria:!0},{tag:"Describedby",directiveName:"DescribedbyGrid",appendGridId:!0,method:"attr",aria:!0}],function(d){var e="uiGridOneBind",c=(d.aria?e+"Aria":e)+(d.directiveName?d.directiveName:d.tag);t.directive(c,["gridUtil",function(s){return{restrict:"A",require:["?uiGrid","?^uiGrid"],link:function(n,o,e,l){var a=n.\$watch(e[c],function(e){if(e){if(d.appendGridId){var t=null;angular.forEach(e.split(" "),function(e){t=(t?t+" ":"")+function(e){var t;if(n.grid)t=n.grid;else if(n.col&&n.col.grid)t=n.col.grid;else if(!l.some(function(e){if(e&&e.grid)return t=e.grid,!0}))throw s.logError("["+c+"] A valid grid could not be found to bind id. Are you using this directive within the correct scope? Trying to generate id: [gridID]-"+e),new Error("No valid grid could be found");t&&(new RegExp(t.id.toString()).test(e)||(e=t.id.toString()+"-"+e));return e}(e)}),e=t}switch(d.method){case"attr":d.aria?o[d.method]("aria-"+d.tag.toLowerCase(),e):o[d.method](d.tag.toLowerCase(),e);break;case"addClass":if(angular.isObject(e)&&!angular.isArray(e)){var r=[],i=!1;if(angular.forEach(e,function(e,t){null!=e&&(i=!0,e&&r.push(t))}),!i)return;e=r}if(!e)return;o.addClass(angular.isArray(e)?e.join(" "):e);break;default:o[d.method](e)}a()}},!0)}}}])})}(),function(){"use strict";var e=angular.module("ui.grid");e.directive("uiGridRenderContainer",["\$timeout","\$document","uiGridConstants","gridUtil","ScrollEvent",function(e,t,r,f,m){return{replace:!0,transclude:!0,templateUrl:"ui-grid/uiGridRenderContainer",require:["^uiGrid","uiGridRenderContainer"],scope:{containerId:"=",rowContainerName:"=",colContainerName:"=",bindScrollHorizontal:"=",bindScrollVertical:"=",enableVerticalScrollbar:"=",enableHorizontalScrollbar:"="},controller:"uiGridRenderContainer as RenderContainer",compile:function(){return{pre:function(e,t,r,i){var n,o,l=i[0],a=i[1],s=e.grid=l.grid;if(!e.rowContainerName)throw new Error("No row render container name specified");if(!e.colContainerName)throw new Error("No column render container name specified");if(!s.renderContainers[e.rowContainerName])throw new Error('Row render container "'+e.rowContainerName+'" is not registered.');if(!s.renderContainers[e.colContainerName])throw new Error('Column render container "'+e.colContainerName+'" is not registered.');n=e.rowContainer=s.renderContainers[e.rowContainerName],o=e.colContainer=s.renderContainers[e.colContainerName],a.containerId=e.containerId,a.rowContainer=n,a.colContainer=o},post:function(s,t,e,r){var d=r[0],l=r[1],c=d.grid,u=l.rowContainer,g=l.colContainer,a=null,h=null,p=c.renderContainers[s.containerId];t.addClass("ui-grid-render-container-"+s.containerId),f.on.mousewheel(t,function(e){var t=new m(c,u,g,m.Sources.RenderContainerMouseWheel);if(0!==e.deltaY){var r=-1*e.deltaY*e.deltaFactor;a=l.viewport[0].scrollTop,t.verticalScrollLength=u.getVerticalScrollLength();var i=(a+r)/t.verticalScrollLength;1<=i&&a<t.verticalScrollLength&&(l.viewport[0].scrollTop=t.verticalScrollLength),i<0?i=0:1<i&&(i=1),t.y={percentage:i,pixels:r}}if(0!==e.deltaX){var n=e.deltaX*e.deltaFactor;h=f.normalizeScrollLeft(l.viewport,c),t.horizontalScrollLength=g.getCanvasWidth()-g.getViewportWidth();var o=(h+n)/t.horizontalScrollLength;o<0?o=0:1<o&&(o=1),t.x={percentage:o,pixels:n}}0!==e.deltaY&&(t.atTop(a)||t.atBottom(a))||0!==e.deltaX&&(t.atLeft(h)||t.atRight(h))||(e.preventDefault(),e.stopPropagation(),t.fireThrottledScrollingEvent("",t))}),t.bind("\$destroy",function(){t.unbind("keydown"),["touchstart","touchmove","touchend","keydown","wheel","mousewheel","DomMouseScroll","MozMousePixelScroll"].forEach(function(e){t.unbind(e)})}),d.grid.registerStyleComputation({priority:6,func:function(){var e,t,r="",i=g.canvasWidth,n=g.getViewportWidth(),o=u.getCanvasHeight(),l=u.getViewportHeight();if(g.needsHScrollbarPlaceholder()&&(l-=c.scrollbarHeight),e=t=g.getHeaderViewportWidth(),r+="\\n .grid"+d.grid.id+" .ui-grid-render-container-"+s.containerId+" .ui-grid-canvas { width: "+i+"px; height: "+o+"px; }",r+="\\n .grid"+d.grid.id+" .ui-grid-render-container-"+s.containerId+" .ui-grid-header-canvas { width: "+(i+c.scrollbarWidth)+"px; }",p.explicitHeaderCanvasHeight){var a=document.querySelector(".grid"+d.grid.id+" .ui-grid-render-container-body .ui-grid-header-canvas");a&&(p.explicitHeaderCanvasHeight=a.offsetHeight),r+="\\n .grid"+d.grid.id+" .ui-grid-render-container-"+s.containerId+" .ui-grid-header-canvas { height: "+p.explicitHeaderCanvasHeight+"px; }"}else r+="\\n .grid"+d.grid.id+" .ui-grid-render-container-"+s.containerId+" .ui-grid-header-canvas { height: inherit; }";return r+="\\n .grid"+d.grid.id+" .ui-grid-render-container-"+s.containerId+" .ui-grid-viewport { width: "+n+"px; height: "+l+"px; }",r+="\\n .grid"+d.grid.id+" .ui-grid-render-container-"+s.containerId+" .ui-grid-header-viewport { width: "+e+"px; }",r+="\\n .grid"+d.grid.id+" .ui-grid-render-container-"+s.containerId+" .ui-grid-footer-canvas { width: "+(i+c.scrollbarWidth)+"px; }",r+="\\n .grid"+d.grid.id+" .ui-grid-render-container-"+s.containerId+" .ui-grid-footer-viewport { width: "+t+"px; }"}})}}}}}]),e.controller("uiGridRenderContainer",["\$scope","gridUtil",function(e,t){}])}(),function(){"use strict";angular.module("ui.grid").directive("uiGridRow",function(){return{replace:!0,require:["^uiGrid","^uiGridRenderContainer"],scope:{row:"=uiGridRow",rowRenderIndex:"="},compile:function(){return{pre:function(t,i,e,r){var n,o,l=r[0],a=r[1];function s(){t.row.getRowTemplateFn.then(function(e){var r=t.\$new();e(r,function(e,t){n&&(n.remove(),o.\$destroy()),i.empty().append(e),n=e,o=r})}).catch(angular.noop)}t.grid=l.grid,t.colContainer=a.colContainer,s(),t.\$watch("row.getRowTemplateFn",function(e,t){e!==t&&s()})},post:function(e,t){e.row.element=t}}}}})}(),angular.module("ui.grid").directive("uiGridStyle",["gridUtil","\$interpolate",function(e,i){return{link:function(e,t){var r=i(t.text(),!0);r&&e.\$watch(r,function(e){t.text(e)})}}}]),function(){"use strict";angular.module("ui.grid").directive("uiGridViewport",["gridUtil","ScrollEvent",function(c,u){return{replace:!0,scope:{},controllerAs:"Viewport",templateUrl:"ui-grid/uiGridViewport",require:["^uiGrid","^uiGridRenderContainer"],link:function(o,l,e,t){var r=t[0],i=t[1],a=(o.containerCtrl=i).rowContainer,s=i.colContainer,d=r.grid;o.grid=r.grid,o.rowContainer=i.rowContainer,o.colContainer=i.colContainer,i.viewport=l,d&&d.options&&d.options.customScroller?d.options.customScroller(l,n):l.on("scroll",n);function n(){var e=l[0].scrollTop,t=c.normalizeScrollLeft(l,d),r=a.scrollVertical(e),i=s.scrollHorizontal(t),n=new u(d,a,s,u.Sources.ViewPortScroll);n.newScrollLeft=t,n.newScrollTop=e,-1<i&&(n.x={percentage:i}),-1<r&&(n.y={percentage:r}),d.scrollContainers(o.\$parent.containerId,n)}o.\$parent.bindScrollVertical&&d.addVerticalScrollSync(o.\$parent.containerId,function(e){i.prevScrollArgs=e,l[0].scrollTop=e.getNewScrollTop(a,i.viewport)}),o.\$parent.bindScrollHorizontal&&(d.addHorizontalScrollSync(o.\$parent.containerId,function(e){var t=(i.prevScrollArgs=e).getNewScrollLeft(s,i.viewport);l[0].scrollLeft=c.denormalizeScrollLeft(i.viewport,t,d)}),d.addHorizontalScrollSync(o.\$parent.containerId+"header",function(e){var t=e.getNewScrollLeft(s,i.viewport);i.headerViewport&&(i.headerViewport.scrollLeft=c.denormalizeScrollLeft(i.viewport,t,d))}),d.addHorizontalScrollSync(o.\$parent.containerId+"footer",function(e){var t=e.getNewScrollLeft(s,i.viewport);i.footerViewport&&(i.footerViewport.scrollLeft=c.denormalizeScrollLeft(i.viewport,t,d))})),o.\$on("\$destroy",function(){l.off()})},controller:["\$scope",function(n){this.rowStyle=function(){var e=n.rowContainer,t=n.colContainer,r={};if(0!==e.currentTopRow){var i="translateY("+e.currentTopRow*e.grid.options.rowHeight+"px)";r.transform=i,r["-webkit-transform"]=i,r["-ms-transform"]=i}return 0!==t.currentFirstColumn&&(t.grid.isRTL()?r["margin-right"]=t.columnOffset+"px":r["margin-left"]=t.columnOffset+"px"),r}}]}}])}(),angular.module("ui.grid").directive("uiGridVisible",function(){return function(e,t,r){e.\$watch(r.uiGridVisible,function(e){t[e?"removeClass":"addClass"]("ui-grid-invisible")})}}),function(){"use strict";function e(g,h,p){return{templateUrl:"ui-grid/ui-grid",scope:{uiGrid:"="},replace:!0,transclude:!0,controller:"uiGridController",compile:function(){return{post:function(a,s,e,t){var d=t.grid;t.scrollbars=[],d.element=s;var r,i,n=100,o=20,l=0;function c(){d.gridWidth=a.gridWidth=h.elementWidth(s),d.canvasWidth=t.grid.gridWidth,d.gridHeight=a.gridHeight=h.elementHeight(s),d.gridHeight-d.scrollbarHeight<=d.options.rowHeight&&d.options.enableMinHeightCheck&&function(){var e=d.options.minRowsToShow*d.options.rowHeight,t=d.options.showHeader?d.options.headerRowHeight:0,r=d.calcFooterHeight(),i=0;d.options.enableHorizontalScrollbar===p.scrollbars.ALWAYS&&(i=h.getScrollbarWidth());var n=0;if(angular.forEach(d.options.columnDefs,function(e){e.hasOwnProperty("filter")?n<1&&(n=1):e.hasOwnProperty("filters")&&n<e.filters.length&&(n=e.filters.length)}),d.options.enableFiltering&&!n){var o=d.options.columnDefs.length&&d.options.columnDefs.every(function(e){return!1===e.enableFiltering});o||(n=1)}var l=t+e+r+i+n*t;s.css("height",l+"px"),d.gridHeight=a.gridHeight=h.elementHeight(s)}(),d.refreshCanvas(!0)}function u(){d.gridWidth=a.gridWidth=h.elementWidth(s),d.gridHeight=a.gridHeight=h.elementHeight(s),d.refreshCanvas(!0)}angular.element(g).on("resize",u),s.on("\$destroy",function(){angular.element(g).off("resize",u),r(),i()}),r=a.\$watch(function(){return d.hasLeftContainer()},function(e,t){e!==t&&d.refreshCanvas(!0)}),i=a.\$watch(function(){return d.hasRightContainer()},function(e,t){e!==t&&d.refreshCanvas(!0)}),c(),d.renderingComplete(),function e(){s[0].offsetWidth<=0&&l<o?(setTimeout(e,n),l++):a.\$applyAsync(c)}()}}}}}angular.module("ui.grid").controller("uiGridController",["\$scope","\$element","\$attrs","gridUtil","\$q","uiGridConstants","gridClassFactory","\$parse","\$compile",function(i,e,n,t,o,l,r,a,s){var d,c=this,u=[];function g(e){return e?e.length:0}function h(e,t){e&&e!==t&&(c.grid.options.columnDefs=i.uiGrid.columnDefs,c.grid.callDataChangeCallbacks(l.dataChange.COLUMN,{orderByColumnDefs:!0,preCompileCellTemplates:!0}))}function p(e){var t=[];if(c.grid.options.fastWatch&&(e=angular.isString(i.uiGrid.data)?c.grid.appScope.\$eval(i.uiGrid.data):i.uiGrid.data),d=e){var r=c.grid.columns.length>(c.grid.rowHeaderColumns?c.grid.rowHeaderColumns.length:0);!r&&!n.uiGridColumns&&0===c.grid.options.columnDefs.length&&0<e.length&&c.grid.buildColumnDefsFromData(e),!r&&(0<c.grid.options.columnDefs.length||0<e.length)&&t.push(c.grid.buildColumns().then(function(){c.grid.preCompileCellTemplates()}).catch(angular.noop)),o.all(t).then(function(){c.grid.modifyRows(d).then(function(){c.grid.redrawInPlace(!0),i.\$evalAsync(function(){c.grid.refreshCanvas(!0),c.grid.callDataChangeCallbacks(l.dataChange.ROW)})}).catch(angular.noop)}).catch(angular.noop)}}c.grid=r.createGrid(i.uiGrid),c.grid.appScope=c.grid.appScope||i.\$parent,e.addClass("grid"+c.grid.id),c.grid.rtl="rtl"===t.getStyles(e[0]).direction,i.grid=c.grid,n.uiGridColumns&&u.push(n.\$observe("uiGridColumns",function(e){c.grid.options.columnDefs=angular.isString(e)?angular.fromJson(e):e,c.grid.buildColumns().then(function(){c.grid.preCompileCellTemplates(),c.grid.refreshCanvas(!0)}).catch(angular.noop)})),c.grid.options.fastWatch?(c.uiGrid=i.uiGrid,angular.isString(i.uiGrid.data)?(u.push(i.\$parent.\$watch(i.uiGrid.data,p)),u.push(i.\$parent.\$watch(function(){return c.grid.appScope[i.uiGrid.data]?c.grid.appScope[i.uiGrid.data].length:void 0},p))):(u.push(i.\$parent.\$watch(function(){return i.uiGrid.data},p)),u.push(i.\$parent.\$watch(function(){return g(i.uiGrid.data)},function(){p(i.uiGrid.data)}))),u.push(i.\$parent.\$watch(function(){return i.uiGrid.columnDefs},h)),u.push(i.\$parent.\$watch(function(){return g(i.uiGrid.columnDefs)},function(){h(i.uiGrid.columnDefs)}))):(angular.isString(i.uiGrid.data)?u.push(i.\$parent.\$watchCollection(i.uiGrid.data,p)):u.push(i.\$parent.\$watchCollection(function(){return i.uiGrid.data},p)),u.push(i.\$parent.\$watchCollection(function(){return i.uiGrid.columnDefs},h)));var f=i.\$watch(function(){return c.grid.styleComputations},function(){c.grid.refreshCanvas(!0)});i.\$on("\$destroy",function(){u.forEach(function(e){e()}),f()}),c.fireEvent=function(e,t){t=t||{},angular.isUndefined(t.grid)&&(t.grid=c.grid),i.\$broadcast(e,t)},c.innerCompile=function(e){s(e)(i)}}]),angular.module("ui.grid").directive("uiGrid",e),e.\$inject=["\$window","gridUtil","uiGridConstants"]}(),function(){"use strict";angular.module("ui.grid").directive("uiGridPinnedContainer",["gridUtil",function(e){return{restrict:"EA",replace:!0,template:'<div class="ui-grid-pinned-container"><div ui-grid-render-container container-id="side" row-container-name="\\'body\\'" col-container-name="side" bind-scroll-vertical="true" class="{{ side }} ui-grid-render-container-{{ side }}"></div></div>',scope:{side:"=uiGridPinnedContainer"},require:"^uiGrid",compile:function(){return{post:function(n,t,e,r){var o=r.grid,i=0;function l(){if("left"===n.side||"right"===n.side){for(var e=o.renderContainers[n.side].visibleColumnCache,t=0,r=0;r<e.length;r++){var i=e[r];t+=i.drawnWidth||i.width||0}return t}}t.addClass("ui-grid-pinned-container-"+n.side),"left"!==n.side&&"right"!==n.side||(o.renderContainers[n.side].getViewportWidth=function(){var t=0;this.visibleColumnCache.forEach(function(e){t+=e.drawnWidth});var e=this.getViewportAdjustment();return t+=e.width}),o.renderContainers.body.registerViewportAdjuster(function(e){return i=l(),e.width-=i,e.side=n.side,e}),o.registerStyleComputation({priority:15,func:function(){var e="";return"left"!==n.side&&"right"!==n.side||(i=l(),t.attr("style",null),e+=".grid"+o.id+" .ui-grid-pinned-container-"+n.side+", .grid"+o.id+" .ui-grid-pinned-container-"+n.side+" .ui-grid-render-container-"+n.side+" .ui-grid-viewport { width: "+i+"px; } "),e}})}}}}}])}(),angular.module("ui.grid").factory("Grid",["\$q","\$compile","\$parse","gridUtil","uiGridConstants","GridOptions","GridColumn","GridRow","GridApi","rowSorter","rowSearcher","GridRenderContainer","\$timeout","ScrollEvent",function(S,r,o,f,s,d,c,u,g,h,t,p,i,E){var e=function(e){var r=this;if(void 0===e||void 0===e.id||!e.id)throw new Error("No ID provided. An ID must be given when creating a grid.");if(!/^[_a-zA-Z0-9-]+\$/.test(e.id))throw new Error("Grid id '"+e.id+'" is invalid. It must follow CSS selector syntax rules.');function t(e){r.isScrollingVertically=!1,r.api.core.raise.scrollEnd(e),r.scrollDirection=s.scrollDirection.NONE}r.id=e.id,delete e.id,r.options=d.initialize(e),r.appScope=r.options.appScopeProvider,r.headerHeight=r.options.headerRowHeight,r.footerHeight=r.calcFooterHeight(),r.columnFooterHeight=r.calcColumnFooterHeight(),r.rtl=!1,r.gridHeight=0,r.gridWidth=0,r.columnBuilders=[],r.rowBuilders=[],r.rowsProcessors=[],r.columnsProcessors=[],r.styleComputations=[],r.viewportAdjusters=[],r.rowHeaderColumns=[],r.dataChangeCallbacks={},r.verticalScrollSyncCallBackFns={},r.horizontalScrollSyncCallBackFns={},r.renderContainers={},r.renderContainers.body=new p("body",r),r.cellValueGetterCache={},r.getRowTemplateFn=null,r.rows=[],r.columns=[],r.isScrollingVertically=!1,r.isScrollingHorizontally=!1,r.scrollDirection=s.scrollDirection.NONE,r.disableScrolling=!1;var i=f.debounce(t,r.options.scrollDebounce),n=f.debounce(t,0);function o(e){r.isScrollingHorizontally=!1,r.api.core.raise.scrollEnd(e),r.scrollDirection=s.scrollDirection.NONE}var l=f.debounce(o,r.options.scrollDebounce),a=f.debounce(o,0);r.flagScrollingVertically=function(e){r.isScrollingVertically||r.isScrollingHorizontally||r.api.core.raise.scrollBegin(e),r.isScrollingVertically=!0,0!==r.options.scrollDebounce&&e.withDelay?i(e):n(e)},r.flagScrollingHorizontally=function(e){r.isScrollingVertically||r.isScrollingHorizontally||r.api.core.raise.scrollBegin(e),r.isScrollingHorizontally=!0,0!==r.options.scrollDebounce&&e.withDelay?l(e):a(e)},r.scrollbarHeight=0,r.scrollbarWidth=0,r.options.enableHorizontalScrollbar!==s.scrollbars.NEVER&&(r.scrollbarHeight=f.getScrollbarWidth()),r.options.enableVerticalScrollbar!==s.scrollbars.NEVER&&(r.scrollbarWidth=f.getScrollbarWidth()),r.api=new g(r),r.api.registerMethod("core","refresh",this.refresh),r.api.registerMethod("core","queueGridRefresh",this.queueGridRefresh),r.api.registerMethod("core","refreshRows",this.refreshRows),r.api.registerMethod("core","queueRefresh",this.queueRefresh),r.api.registerMethod("core","handleWindowResize",this.handleWindowResize),r.api.registerMethod("core","addRowHeaderColumn",this.addRowHeaderColumn),r.api.registerMethod("core","scrollToIfNecessary",function(e,t){return r.scrollToIfNecessary(e,t)}),r.api.registerMethod("core","scrollTo",function(e,t){return r.scrollTo(e,t)}),r.api.registerMethod("core","registerRowsProcessor",this.registerRowsProcessor),r.api.registerMethod("core","registerColumnsProcessor",this.registerColumnsProcessor),r.api.registerMethod("core","sortHandleNulls",h.handleNulls),r.api.registerEvent("core","sortChanged"),r.api.registerEvent("core","columnVisibilityChanged"),r.api.registerMethod("core","notifyDataChange",this.notifyDataChange),r.api.registerMethod("core","clearAllFilters",this.clearAllFilters),r.registerDataChangeCallback(r.columnRefreshCallback,[s.dataChange.COLUMN]),r.registerDataChangeCallback(r.processRowsCallback,[s.dataChange.EDIT]),r.registerDataChangeCallback(r.updateFooterHeightCallback,[s.dataChange.OPTIONS]),r.registerStyleComputation({priority:10,func:r.getFooterStyles})};e.prototype.calcFooterHeight=function(){if(!this.hasFooter())return 0;var e=0;return this.options.showGridFooter&&(e+=this.options.gridFooterHeight),e+=this.calcColumnFooterHeight()},e.prototype.calcColumnFooterHeight=function(){var e=0;return this.options.showColumnFooter&&(e+=this.options.columnFooterHeight),e},e.prototype.getFooterStyles=function(){var e=".grid"+this.id+" .ui-grid-footer-aggregates-row { height: "+this.options.columnFooterHeight+"px; }";return e+=" .grid"+this.id+" .ui-grid-footer-info { height: "+this.options.gridFooterHeight+"px; }"},e.prototype.hasFooter=function(){return this.options.showGridFooter||this.options.showColumnFooter},e.prototype.isRTL=function(){return this.rtl},e.prototype.registerColumnBuilder=function(e){this.columnBuilders.push(e)},e.prototype.buildColumnDefsFromData=function(e){this.options.columnDefs=f.getColumnsFromData(e,this.options.excludeProperties)},e.prototype.registerRowBuilder=function(e){this.rowBuilders.push(e)},e.prototype.registerDataChangeCallback=function(e,t,r){var i=this,n=f.nextUid();return t||(t=[s.dataChange.ALL]),Array.isArray(t)||f.logError("Expected types to be an array or null in registerDataChangeCallback, value passed was: "+t),this.dataChangeCallbacks[n]={callback:e,types:t,_this:r},function(){delete i.dataChangeCallbacks[n]}},e.prototype.callDataChangeCallbacks=function(r,i){angular.forEach(this.dataChangeCallbacks,function(e,t){-1===e.types.indexOf(s.dataChange.ALL)&&-1===e.types.indexOf(r)&&r!==s.dataChange.ALL||(e._this?e.callback.apply(e._this,this,i):e.callback(this,i))},this)},e.prototype.notifyDataChange=function(e){var t=s.dataChange;e===t.ALL||e===t.COLUMN||e===t.EDIT||e===t.ROW||e===t.OPTIONS?this.callDataChangeCallbacks(e):f.logError("Notified of a data change, but the type was not recognised, so no action taken, type was: "+e)},e.prototype.columnRefreshCallback=function(e,t){e.buildColumns(t),e.queueGridRefresh()},e.prototype.processRowsCallback=function(e){e.queueGridRefresh()},e.prototype.updateFooterHeightCallback=function(e){e.footerHeight=e.calcFooterHeight(),e.columnFooterHeight=e.calcColumnFooterHeight()},e.prototype.getColumn=function(t){var e=this.columns.filter(function(e){return e.colDef.name===t});return 0<e.length?e[0]:null},e.prototype.getColDef=function(t){var e=this.options.columnDefs.filter(function(e){return e.name===t});return 0<e.length?e[0]:null},e.prototype.assignTypes=function(){var n=this;n.options.columnDefs.forEach(function(e,t){if(!e.type){var r=new c(e,t,n),i=0<n.rows.length?n.rows[0]:null;e.type=i?f.guessType(n.getCellValue(i,r)):"string"}})},e.prototype.isRowHeaderColumn=function(e){return-1!==this.rowHeaderColumns.indexOf(e)},e.prototype.addRowHeaderColumn=function(e,t,r){var i=this;void 0===t&&(t=0);var n=new c(e,f.nextUid(),i);n.isRowHeader=!0,i.isRTL()?(i.createRightContainer(),n.renderContainer="right"):(i.createLeftContainer(),n.renderContainer="left"),i.columnBuilders[0](e,n,i.options).then(function(){n.enableFiltering=!1,n.enableSorting=!1,n.enableHiding=!1,n.headerPriority=t,i.rowHeaderColumns.push(n),i.rowHeaderColumns=i.rowHeaderColumns.sort(function(e,t){return e.headerPriority-t.headerPriority}),r||i.buildColumns().then(function(){i.preCompileCellTemplates(),i.queueGridRefresh()}).catch(angular.noop)}).catch(angular.noop)},e.prototype.getOnlyDataColumns=function(){var t=this,r=[];return t.columns.forEach(function(e){-1===t.rowHeaderColumns.indexOf(e)&&r.push(e)}),r},e.prototype.buildColumns=function(e){var t={orderByColumnDefs:!1};angular.extend(t,e);var r,i=this,n=[],o=i.rowHeaderColumns.length;for(r=0;r<i.columns.length;r++)i.getColDef(i.columns[r].name)||(i.columns.splice(r,1),r--);for(var l=i.rowHeaderColumns.length-1;0<=l;l--)i.columns.unshift(i.rowHeaderColumns[l]);if(i.options.columnDefs.forEach(function(t,e){i.preprocessColDef(t);var r=i.getColumn(t.name);r?r.updateColumnDef(t,!1):(r=new c(t,f.nextUid(),i),i.columns.splice(e+o,0,r)),i.columnBuilders.forEach(function(e){n.push(e.call(i,t,r,i.options))})}),t.orderByColumnDefs){var a=i.columns.slice(0),s=Math.min(i.options.columnDefs.length,i.columns.length);for(r=0;r<s;r++)i.columns[r+o].name!==i.options.columnDefs[r].name?a[r+o]=i.getColumn(i.options.columnDefs[r].name):a[r+o]=i.columns[r+o];i.columns.length=0,Array.prototype.splice.apply(i.columns,[0,0].concat(a))}return S.all(n).then(function(){0<i.rows.length&&i.assignTypes(),t.preCompileCellTemplates&&i.preCompileCellTemplates()}).catch(angular.noop)},e.prototype.preCompileCellTemplate=function(e){var t=e.cellTemplate.replace(s.MODEL_COL_FIELD,this.getQualifiedColField(e));t=t.replace(s.COL_FIELD,"grid.getCellValue(row, col)"),e.compiledElementFn=r(t),e.compiledElementFnDefer&&e.compiledElementFnDefer.resolve(e.compiledElementFn)},e.prototype.preCompileCellTemplates=function(){var t=this;t.columns.forEach(function(e){e.cellTemplate?t.preCompileCellTemplate(e):e.cellTemplatePromise&&e.cellTemplatePromise.then(function(){t.preCompileCellTemplate(e)}).catch(angular.noop)})},e.prototype.getQualifiedColField=function(e){var t="row.entity";return e.field===s.ENTITY_BINDING?t:f.preEval(t+"."+e.field)},e.prototype.createLeftContainer=function(){this.hasLeftContainer()||(this.renderContainers.left=new p("left",this,{disableColumnOffset:!0}))},e.prototype.createRightContainer=function(){this.hasRightContainer()||(this.renderContainers.right=new p("right",this,{disableColumnOffset:!0}))},e.prototype.hasLeftContainer=function(){return void 0!==this.renderContainers.left},e.prototype.hasRightContainer=function(){return void 0!==this.renderContainers.right},e.prototype.preprocessColDef=function(e){if(!e.field&&!e.name)throw new Error("colDef.name or colDef.field property is required");if(void 0===e.name&&void 0!==e.field){for(var t=e.field,r=2;this.getColumn(t);)t=e.field+r.toString(),r++;e.name=t}},e.prototype.newInN=function(e,t,r,i){for(var n=[],o=0;o<t.length;o++){for(var l=i?t[o][i]:t[o],a=!1,s=0;s<e.length;s++){var d=r?e[s][r]:e[s];if(this.options.rowEquality(l,d)){a=!0;break}}a||n.push(l)}return n},e.prototype.getRow=function(t,e){var r=this,i=(e=void 0===e?r.rows:e).filter(function(e){return r.options.rowEquality(e.entity,t)});return 0<i.length?i[0]:null},e.prototype.modifyRows=function(e){var n=this,o=n.rows.slice(0),l=n.rowHashMap||n.createRowHashMap(),a=!0;n.rowHashMap=n.createRowHashMap(),n.rows.length=0,e.forEach(function(e,t){var r,i;(i=n.options.enableRowHashing?l.get(e):n.getRow(e,o))&&((r=i).entity=e),r||(r=n.processRowBuilders(new u(e,t,n))),n.rows.push(r),n.rowHashMap.put(e,r),r.isSelected||(a=!1)}),n.selection&&n.rows.length&&(n.selection.selectAll=a),n.assignTypes();var t=S.when(n.processRowsProcessors(n.rows)).then(function(e){return n.setVisibleRows(e)}).catch(angular.noop),r=S.when(n.processColumnsProcessors(n.columns)).then(function(e){return n.setVisibleColumns(e)}).catch(angular.noop);return S.all([t,r])},e.prototype.addRows=function(e){for(var t=this,r=t.rows.length,i=0;i<e.length;i++){var n=t.processRowBuilders(new u(e[i],i+r,t));if(t.options.enableRowHashing){var o=t.rowHashMap.get(n.entity);o&&(o.row=n)}t.rows.push(n)}},e.prototype.processRowBuilders=function(t){var r=this;return r.rowBuilders.forEach(function(e){e.call(r,t,r.options)}),t},e.prototype.registerStyleComputation=function(e){this.styleComputations.push(e)},e.prototype.registerRowsProcessor=function(e,t){if(!angular.isFunction(e))throw"Attempt to register non-function rows processor: "+e;this.rowsProcessors.push({processor:e,priority:t}),this.rowsProcessors.sort(function(e,t){return e.priority-t.priority})},e.prototype.removeRowsProcessor=function(r){var i=-1;this.rowsProcessors.forEach(function(e,t){e.processor===r&&(i=t)}),-1!==i&&this.rowsProcessors.splice(i,1)},e.prototype.processRowsProcessors=function(e){var n=this,t=e.slice(0);if(0===n.rowsProcessors.length)return S.when(t);var o=S.defer();return function t(r,e){var i=n.rowsProcessors[r].processor;return S.when(i.call(n,e,n.columns)).then(function(e){if(!e)throw"Processor at index "+r+" did not return a set of renderable rows";if(!angular.isArray(e))throw"Processor at index "+r+" did not return an array";if(++r<=n.rowsProcessors.length-1)return t(r,e);o.resolve(e)}).catch(function(e){throw e})}(0,t),o.promise},e.prototype.setVisibleRows=function(e){var t=this;for(var r in t.renderContainers){var i=t.renderContainers[r];i.canvasHeightShouldUpdate=!0,void 0===i.visibleRowCache?i.visibleRowCache=[]:i.visibleRowCache.length=0}for(var n=0;n<e.length;n++){var o=e[n],l=void 0!==o.renderContainer&&o.renderContainer?o.renderContainer:"body";o.visible&&t.renderContainers[l].visibleRowCache.push(o)}t.api.core.raise.rowsVisibleChanged(this.api),t.api.core.raise.rowsRendered(this.api)},e.prototype.registerColumnsProcessor=function(e,t){if(!angular.isFunction(e))throw"Attempt to register non-function rows processor: "+e;this.columnsProcessors.push({processor:e,priority:t}),this.columnsProcessors.sort(function(e,t){return e.priority-t.priority})},e.prototype.removeColumnsProcessor=function(e){var t=this.columnsProcessors.indexOf(e);void 0!==t&&void 0!==t&&this.columnsProcessors.splice(t,1)},e.prototype.processColumnsProcessors=function(e){var n=this,o=e.slice(0);if(0===n.columnsProcessors.length)return S.when(o);var l=S.defer();return function t(r,e){var i=n.columnsProcessors[r].processor;return S.when(i.call(n,e,n.rows)).then(function(e){if(!e)throw"Processor at index "+r+" did not return a set of renderable rows";if(!angular.isArray(e))throw"Processor at index "+r+" did not return an array";if(++r<=n.columnsProcessors.length-1)return t(r,o);l.resolve(o)}).catch(angular.noop)}(0,o),l.promise},e.prototype.setVisibleColumns=function(e){for(var t in this.renderContainers)this.renderContainers[t].visibleColumnCache.length=0;for(var r=0;r<e.length;r++){var i=e[r];i.visible&&(void 0!==i.renderContainer&&i.renderContainer?this.renderContainers[i.renderContainer].visibleColumnCache.push(i):this.renderContainers.body.visibleColumnCache.push(i))}},e.prototype.handleWindowResize=function(e){var t=this;return t.gridWidth=f.elementWidth(t.element),t.gridHeight=f.elementHeight(t.element),t.queueRefresh()},e.prototype.queueRefresh=function(){var e=this;return e.refreshCanceller&&i.cancel(e.refreshCanceller),e.refreshCanceller=i(function(){e.refreshCanvas(!0)}),e.refreshCanceller.then(function(){e.refreshCanceller=null}).catch(angular.noop),e.refreshCanceller},e.prototype.queueGridRefresh=function(){var e=this;return e.gridRefreshCanceller&&i.cancel(e.gridRefreshCanceller),e.gridRefreshCanceller=i(function(){e.refresh(!0)}),e.gridRefreshCanceller.then(function(){e.gridRefreshCanceller=null}).catch(angular.noop),e.gridRefreshCanceller},e.prototype.updateCanvasHeight=function(){for(var e in this.renderContainers)this.renderContainers.hasOwnProperty(e)&&(this.renderContainers[e].canvasHeightShouldUpdate=!0)},e.prototype.buildStyles=function(){var r=this;r.customStyles="",r.styleComputations.sort(function(e,t){return null===e.priority?1:null===t.priority?-1:null===e.priority&&null===t.priority?0:e.priority-t.priority}).forEach(function(e){var t=e.func.call(r);angular.isString(t)&&(r.customStyles+="\\n"+t)})},e.prototype.minColumnsToRender=function(){var n=this,o=this.getViewportWidth(),l=0,a=0;return n.columns.forEach(function(e,t){if(a<o)a+=e.drawnWidth,l++;else{for(var r=0,i=t;t-l<=i;i--)r+=n.columns[i].drawnWidth;r<o&&l++}}),l},e.prototype.getBodyHeight=function(){return this.getViewportHeight()},e.prototype.getViewportHeight=function(){var e=this.gridHeight-this.headerHeight-this.footerHeight;return e+=this.getViewportAdjustment().height},e.prototype.getViewportWidth=function(){var e=this.gridWidth;return e+=this.getViewportAdjustment().width},e.prototype.getHeaderViewportWidth=function(){return this.getViewportWidth()},e.prototype.addVerticalScrollSync=function(e,t){this.verticalScrollSyncCallBackFns[e]=t},e.prototype.addHorizontalScrollSync=function(e,t){this.horizontalScrollSyncCallBackFns[e]=t},e.prototype.scrollContainers=function(e,t){if(t.y){var r=["body","left","right"];this.flagScrollingVertically(t),"body"===e?r=["left","right"]:"left"===e?r=["body","right"]:"right"===e&&(r=["body","left"]);for(var i=0;i<r.length;i++){var n=r[i];this.verticalScrollSyncCallBackFns[n]&&this.verticalScrollSyncCallBackFns[n](t)}}if(t.x){var o=["body","bodyheader","bodyfooter"];this.flagScrollingHorizontally(t),"body"===e&&(o=["bodyheader","bodyfooter"]);for(var l=0;l<o.length;l++){var a=o[l];this.horizontalScrollSyncCallBackFns[a]&&this.horizontalScrollSyncCallBackFns[a](t)}}},e.prototype.registerViewportAdjuster=function(e){this.viewportAdjusters.push(e)},e.prototype.removeViewportAdjuster=function(e){var t=this.viewportAdjusters.indexOf(e);void 0!==t&&void 0!==t&&this.viewportAdjusters.splice(t,1)},e.prototype.getViewportAdjustment=function(){var t={height:0,width:0};return this.viewportAdjusters.forEach(function(e){t=e.call(this,t)}),t},e.prototype.getVisibleRowCount=function(){return this.renderContainers.body.visibleRowCache.length},e.prototype.getVisibleRows=function(){return this.renderContainers.body.visibleRowCache},e.prototype.getVisibleColumnCount=function(){return this.renderContainers.body.visibleColumnCache.length},e.prototype.searchRows=function(e){return t.search(this,e,this.columns)},e.prototype.sortByColumn=function(e){return h.sort(this,e,this.columns)},e.prototype.getCellValue=function(e,t){return void 0!==e.entity["\$\$"+t.uid]?e.entity["\$\$"+t.uid].rendered:this.options.flatEntityAccess&&void 0!==t.field?e.entity[t.field]:(t.cellValueGetterCache||(t.cellValueGetterCache=o(e.getEntityQualifiedColField(t))),t.cellValueGetterCache(e))},e.prototype.getCellDisplayValue=function(e,t){if(!t.cellDisplayGetterCache){var r=t.cellFilter?" | "+t.cellFilter:"";if(void 0!==e.entity["\$\$"+t.uid])t.cellDisplayGetterCache=o(e.entity["\$\$"+t.uid].rendered+r);else if(this.options.flatEntityAccess&&void 0!==t.field){var i=t.field.replace(/(')|(\\\\)/g,"\\\\\$&");t.cellDisplayGetterCache=o("entity['"+i+"']"+r)}else t.cellDisplayGetterCache=o(e.getEntityQualifiedColField(t)+r)}var n=angular.extend({},e,{col:t});return t.cellDisplayGetterCache(n)},e.prototype.getNextColumnSortPriority=function(){var t=0;return this.columns.forEach(function(e){e.sort&&void 0!==e.sort.priority&&e.sort.priority>=t&&(t=e.sort.priority+1)}),t},e.prototype.resetColumnSorting=function(t){this.columns.forEach(function(e){e===t||e.suppressRemoveSort||(e.sort={})})},e.prototype.getColumnSorting=function(){var t=[];return this.columns.slice(0).sort(h.prioritySort).forEach(function(e){e.sort&&void 0!==e.sort.direction&&e.sort.direction&&(e.sort.direction===s.ASC||e.sort.direction===s.DESC)&&t.push(e)}),t},e.prototype.sortColumn=function(e,t,r){var i=this,n=null;if(void 0===e||!e)throw new Error("No column parameter provided");if("boolean"==typeof t?r=t:n=t,r?void 0===e.sort.priority&&(e.sort.priority=i.getNextColumnSortPriority()):(i.resetColumnSorting(e),e.sort.priority=void 0,e.sort.priority=i.getNextColumnSortPriority()),n)e.sort.direction=n;else{var o=e.sortDirectionCycle.indexOf(e.sort&&e.sort.direction?e.sort.direction:null);o=(o+1)%e.sortDirectionCycle.length,e.colDef&&e.suppressRemoveSort&&!e.sortDirectionCycle[o]&&(o=(o+1)%e.sortDirectionCycle.length),e.sortDirectionCycle[o]?e.sort.direction=e.sortDirectionCycle[o]:l(e,i)}return i.api.core.raise.sortChanged(i,i.getColumnSorting()),S.when(e)};var l=function(t,e){e.columns.forEach(function(e){e.sort&&void 0!==e.sort.priority&&e.sort.priority>t.sort.priority&&(e.sort.priority-=1)}),t.sort={}};function a(e,t){return e||0<t?t:null}function n(e,t){var r=e/t;return r<=1?r:1}function T(e,t,r){if(n(e,t)!==r)return{percentage:n(e,t)}}function R(e,t,r){var i=e/t;if((i=1<i?1:i)!==r)return{percentage:i}}function m(){}return e.prototype.renderingComplete=function(){angular.isFunction(this.options.onRegisterApi)&&this.options.onRegisterApi(this.api),this.api.core.raise.renderingComplete(this.api)},e.prototype.createRowHashMap=function(){var e=new m;return e.grid=this,e},e.prototype.refresh=function(e){var t=this,r=t.processRowsProcessors(t.rows).then(function(e){t.setVisibleRows(e)}).catch(angular.noop),i=t.processColumnsProcessors(t.columns).then(function(e){t.setVisibleColumns(e)}).catch(angular.noop);return S.all([r,i]).then(function(){t.refreshCanvas(!0),t.redrawInPlace(e)}).catch(angular.noop)},e.prototype.refreshRows=function(){var t=this;return t.processRowsProcessors(t.rows).then(function(e){t.setVisibleRows(e),t.redrawInPlace(),t.refreshCanvas(!0)}).catch(angular.noop)},e.prototype.refreshCanvas=function(u){var g=this,h=S.defer(),p=[];for(var e in g.renderContainers)if(g.renderContainers.hasOwnProperty(e)){var t=g.renderContainers[e];if(null===t.canvasWidth||isNaN(t.canvasWidth))continue;(t.header||t.headerCanvas)&&(t.explicitHeaderHeight=t.explicitHeaderHeight||null,t.explicitHeaderCanvasHeight=t.explicitHeaderCanvasHeight||null,p.push(t))}return u&&g.buildStyles(),0<p.length?i(function(){var e,t,r=!1,i=0,n=0,o=function(e,t){return e!==t&&(r=!0),t};for(e=0;e<p.length;e++)if(null!==(t=p[e]).canvasWidth&&!isNaN(t.canvasWidth)){if(t.header){var l=t.headerHeight=o(t.headerHeight,f.outerElementHeight(t.header)),a=f.getBorderSize(t.header,"top"),s=f.getBorderSize(t.header,"bottom"),d=parseInt(l-a-s,10);d=d<0?0:d,t.innerHeaderHeight=d,!t.explicitHeaderHeight&&i<d&&(i=d)}if(t.headerCanvas){var c=t.headerCanvasHeight=o(t.headerCanvasHeight,parseInt(f.outerElementHeight(t.headerCanvas),10));!t.explicitHeaderCanvasHeight&&n<c&&(n=c)}}for(e=0;e<p.length;e++)t=p[e],0<i&&void 0!==t.headerHeight&&null!==t.headerHeight&&(t.explicitHeaderHeight||t.headerHeight<i)&&(t.explicitHeaderHeight=o(t.explicitHeaderHeight,i)),0<n&&void 0!==t.headerCanvasHeight&&null!==t.headerCanvasHeight&&(t.explicitHeaderCanvasHeight||t.headerCanvasHeight<n)&&(t.explicitHeaderCanvasHeight=o(t.explicitHeaderCanvasHeight,n));u&&r&&g.buildStyles(),h.resolve()}):i(function(){h.resolve()}),h.promise},e.prototype.redrawInPlace=function(e){for(var t in this.renderContainers){var r=this.renderContainers[t],i=a(e,r.prevScrollTop),n=a(e,r.prevScrollLeft),o=e||0<i?null:r.prevScrolltopPercentage,l=e||0<n?null:r.prevScrollleftPercentage;r.adjustRows(i,o),r.adjustColumns(n,l)}},e.prototype.hasLeftContainerColumns=function(){return this.hasLeftContainer()&&0<this.renderContainers.left.renderedColumns.length},e.prototype.hasRightContainerColumns=function(){return this.hasRightContainer()&&0<this.renderContainers.right.renderedColumns.length},e.prototype.scrollToIfNecessary=function(e,t){var r=this,i=new E(r,"uiGrid.scrollToIfNecessary"),n=r.renderContainers.body.visibleRowCache,o=r.renderContainers.body.visibleColumnCache,l=r.renderContainers.body.prevScrollTop+r.headerHeight;l=l<0?0:l;var a=r.renderContainers.body.prevScrollLeft,s=r.renderContainers.body.prevScrollTop+r.gridHeight-r.renderContainers.body.headerHeight-r.footerHeight-r.scrollbarHeight,d=r.renderContainers.body.prevScrollLeft+Math.ceil(r.renderContainers.body.getViewportWidth());if(null!==e){var c,u=n.indexOf(e),g=r.renderContainers.body.getCanvasHeight()-r.renderContainers.body.getViewportHeight(),h=u*r.options.rowHeight+r.headerHeight;(h=h<0?0:h)<Math.floor(l)?(c=r.renderContainers.body.prevScrollTop-(l-h),t&&t.colDef&&t.colDef.enableCellEditOnFocus&&(c=c-r.footerHeight-r.scrollbarHeight),i.y=T(c,g,r.renderContainers.body.prevScrolltopPercentage)):h>Math.ceil(s)&&(c=h-s+r.renderContainers.body.prevScrollTop,i.y=T(c,g,r.renderContainers.body.prevScrolltopPercentage))}if(null!==t){for(var p=o.indexOf(t),f=r.renderContainers.body.getCanvasWidth()-r.renderContainers.body.getViewportWidth(),m=0,v=0;v<p;v++)m+=o[v].drawnWidth;var C,w=(m=m<0?0:m)+t.drawnWidth;w=w<0?0:w,m<a?(C=r.renderContainers.body.prevScrollLeft-(a-m),i.x=R(C,f,r.renderContainers.body.prevScrollleftPercentage)):d<w&&(C=w-d+r.renderContainers.body.prevScrollLeft,i.x=R(C,f,r.renderContainers.body.prevScrollleftPercentage))}var y=S.defer();if(i.y||i.x){i.withDelay=!1,r.scrollContainers("",i);var b=r.api.core.on.scrollEnd(null,function(){y.resolve(i),b()})}else y.resolve();return y.promise},e.prototype.scrollTo=function(e,t){var r=null,i=null;return null!=e&&(r=this.getRow(e)),null!=t&&(i=this.getColumn(t.name?t.name:t.field)),this.scrollToIfNecessary(r,i)},e.prototype.clearAllFilters=function(e,t,r){if(void 0===e&&(e=!0),void 0===t&&(t=!1),void 0===r&&(r=!1),this.columns.forEach(function(e){e.filters.forEach(function(e){e.term=void 0,t&&(e.condition=void 0),r&&(e.flags=void 0)})}),e)return this.refreshRows()},m.prototype={put:function(e,t){this[this.grid.options.rowIdentity(e)]=t},get:function(e){return this[this.grid.options.rowIdentity(e)]},remove:function(e){var t=this[e=this.grid.options.rowIdentity(e)];return delete this[e],t}},e}]),angular.module("ui.grid").factory("GridApi",["\$q","\$rootScope","gridUtil","uiGridConstants","GridRow",function(e,t,d,r,i){var n=function(e){this.grid=e,this.listeners=[],this.registerEvent("core","renderingComplete"),this.registerEvent("core","filterChanged"),this.registerMethod("core","setRowInvisible",i.prototype.setRowInvisible),this.registerMethod("core","clearRowInvisible",i.prototype.clearRowInvisible),this.registerMethod("core","getVisibleRows",this.grid.getVisibleRows),this.registerEvent("core","rowsVisibleChanged"),this.registerEvent("core","rowsRendered"),this.registerEvent("core","scrollBegin"),this.registerEvent("core","scrollEnd"),this.registerEvent("core","canvasHeightChanged"),this.registerEvent("core","gridDimensionChanged")};function c(e,r,i,n){return t.\$on(e,function(e){var t=Array.prototype.slice.call(arguments);t.splice(0,1),r.apply(n||i.api,t)})}return n.prototype.suppressEvents=function(e,t){var r=this,i=angular.isArray(e)?e:[e],n=r.listeners.filter(function(t){return i.some(function(e){return t.handler===e})});n.forEach(function(e){e.dereg()}),t(),n.forEach(function(e){e.dereg=c(e.eventId,e.handler,r.grid,e._this)})},n.prototype.registerEvent=function(o,l){var a=this;a[o]||(a[o]={});var e=a[o];e.on||(e.on={},e.raise={});var s=a.grid.id+o+l;e.raise[l]=function(){t.\$emit.apply(t,[s].concat(Array.prototype.slice.call(arguments)))},e.on[l]=function(e,t,r){if(null===e||void 0!==e.\$on){var i={handler:t,dereg:c(s,t,a.grid,r),eventId:s,scope:e,_this:r};a.listeners.push(i);var n=function(){i.dereg();var e=a.listeners.indexOf(i);a.listeners.splice(e,1)};return e&&e.\$on("\$destroy",function(){n()}),n}d.logError("asked to listen on "+o+".on."+l+" but scope wasn't passed in the input parameters.  It is legitimate to pass null, but you've passed something else, so you probably forgot to provide scope rather than did it deliberately, not registering")}},n.prototype.registerEventsFromObject=function(e){var r=this,i=[];angular.forEach(e,function(e,t){var r={name:t,events:[]};angular.forEach(e,function(e,t){r.events.push(t)}),i.push(r)}),i.forEach(function(t){t.events.forEach(function(e){r.registerEvent(t.name,e)})})},n.prototype.registerMethod=function(e,t,r,i){this[e]||(this[e]={}),this[e][t]=d.createBoundedWrapper(i||this.grid,r)},n.prototype.registerMethodsFromObject=function(e,r){var i=this,n=[];angular.forEach(e,function(e,t){var r={name:t,methods:[]};angular.forEach(e,function(e,t){r.methods.push({name:t,fn:e})}),n.push(r)}),n.forEach(function(t){t.methods.forEach(function(e){i.registerMethod(t.name,e.name,e.fn,r)})})},n}]),angular.module("ui.grid").factory("GridColumn",["gridUtil","uiGridConstants","i18nService",function(d,c,e){function t(e,t,r){var n=this;n.grid=r,n.uid=t,n.updateColumnDef(e,!0),n.aggregationValue=void 0,n.updateAggregationValue=function(){if(n.aggregationType){var t=0,e=n.grid.getVisibleRows(),r=function(){var i=[];return e.forEach(function(e){var t=n.grid.getCellValue(e,n),r=Number(t);isNaN(r)||i.push(r)}),i};angular.isFunction(n.aggregationType)?n.aggregationValue=n.aggregationType(e,n):n.aggregationType===c.aggregationTypes.count?n.aggregationValue=n.grid.getVisibleRowCount():n.aggregationType===c.aggregationTypes.sum?(r().forEach(function(e){t+=e}),n.aggregationValue=t):n.aggregationType===c.aggregationTypes.avg?(r().forEach(function(e){t+=e}),t/=r().length,n.aggregationValue=t):n.aggregationType===c.aggregationTypes.min?n.aggregationValue=Math.min.apply(null,r()):n.aggregationType===c.aggregationTypes.max?n.aggregationValue=Math.max.apply(null,r()):n.aggregationValue=" "}else n.aggregationValue=void 0},this.getAggregationValue=function(){return n.aggregationValue}}function u(e){return void 0===e.displayName?d.readableColumnName(e.name):e.displayName}return t.prototype.hideColumn=function(){this.colDef.visible=!1},t.prototype.setPropertyOrDefault=function(e,t,r){var i=this;void 0!==e[t]&&e[t]?i[t]=e[t]:void 0!==i[t]?i[t]=i[t]:i[t]=r||{}},t.prototype.updateColumnDef=function(i,e){var n=this;if(void 0===(n.colDef=i).name)throw new Error("colDef.name is required for column at index "+n.grid.options.columnDefs.indexOf(i));if(n.displayName=u(i),!angular.isNumber(n.width)||!n.hasCustomWidth||i.allowCustomWidthOverride){var t=i.width,r="Cannot parse column width '"+t+"' for column named '"+i.name+"'";if(n.hasCustomWidth=!1,angular.isString(t)||angular.isNumber(t))if(angular.isString(t))if(d.endsWith(t,"%")){var o=t.replace(/%/g,""),l=parseInt(o,10);if(isNaN(l))throw new Error(r);n.width=t}else if(t.match(/^(\\d+)\$/))n.width=parseInt(t.match(/^(\\d+)\$/)[1],10);else{if(!t.match(/^\\*+\$/))throw new Error(r);n.width=t}else n.width=t;else n.width="*"}function a(e){return angular.isString(e)||angular.isNumber(e)}["minWidth","maxWidth"].forEach(function(e){var t=i[e],r="Cannot parse column "+e+" '"+t+"' for column named '"+i.name+"'";if("minWidth"===e&&!a(t)&&angular.isDefined(n.grid.options.minimumColumnSize)&&(t=n.grid.options.minimumColumnSize),a(t))if(angular.isString(t)){if(!t.match(/^(\\d+)\$/))throw new Error(r);n[e]=parseInt(t.match(/^(\\d+)\$/)[1],10)}else n[e]=t;else n[e]="minWidth"===e?30:9e3}),n.field=void 0===i.field?i.name:i.field,"string"!=typeof n.field&&d.logError("Field is not a string, this is likely to break the code, Field is: "+n.field),n.name=i.name,n.displayName=u(i),n.aggregationType=angular.isDefined(i.aggregationType)?i.aggregationType:null,n.footerCellTemplate=angular.isDefined(i.footerCellTemplate)?i.footerCellTemplate:null,void 0===i.cellTooltip||!1===i.cellTooltip?n.cellTooltip=!1:!0===i.cellTooltip?n.cellTooltip=function(e,t){return n.grid.getCellValue(e,t)}:"function"==typeof i.cellTooltip?n.cellTooltip=i.cellTooltip:n.cellTooltip=function(e,t){return t.colDef.cellTooltip},void 0===i.headerTooltip||!1===i.headerTooltip?n.headerTooltip=!1:!0===i.headerTooltip?n.headerTooltip=function(e){return e.displayName}:"function"==typeof i.headerTooltip?n.headerTooltip=i.headerTooltip:n.headerTooltip=function(e){return e.colDef.headerTooltip},n.footerCellClass=i.footerCellClass,n.cellClass=i.cellClass,n.headerCellClass=i.headerCellClass,n.cellFilter=i.cellFilter?i.cellFilter:"",n.sortCellFiltered=!!i.sortCellFiltered,n.filterCellFiltered=!!i.filterCellFiltered,n.headerCellFilter=i.headerCellFilter?i.headerCellFilter:"",n.footerCellFilter=i.footerCellFilter?i.footerCellFilter:"",n.visible=d.isNullOrUndefined(i.visible)||i.visible,n.headerClass=i.headerClass,n.enableSorting=void 0!==i.enableSorting?i.enableSorting:n.grid.options.enableSorting,n.sortingAlgorithm=i.sortingAlgorithm,n.sortDirectionCycle=void 0!==i.sortDirectionCycle?i.sortDirectionCycle:[null,c.ASC,c.DESC],void 0===n.suppressRemoveSort&&(n.suppressRemoveSort=void 0!==i.suppressRemoveSort&&i.suppressRemoveSort),n.enableFiltering=void 0===i.enableFiltering||i.enableFiltering,n.setPropertyOrDefault(i,"menuItems",[]),e&&n.setPropertyOrDefault(i,"sort"),n.setPropertyOrDefault(i,"defaultSort");var s=[];i.filter?s.push(i.filter):i.filters?s=i.filters:s.push({}),e?(n.setPropertyOrDefault(i,"filter"),n.setPropertyOrDefault(i,"extraStyle"),n.setPropertyOrDefault(i,"filters",s)):n.filters.length===s.length&&n.filters.forEach(function(e,t){void 0!==s[t].placeholder&&(e.placeholder=s[t].placeholder),void 0!==s[t].ariaLabel&&(e.ariaLabel=s[t].ariaLabel),void 0!==s[t].flags&&(e.flags=s[t].flags),void 0!==s[t].type&&(e.type=s[t].type),void 0!==s[t].selectOptions&&(e.selectOptions=s[t].selectOptions)})},t.prototype.unsort=function(){var t=this.sort.priority;this.grid.columns.forEach(function(e){e.sort&&void 0!==e.sort.priority&&e.sort.priority>t&&(e.sort.priority-=1)}),this.sort={},this.grid.api.core.raise.sortChanged(this.grid,this.grid.getColumnSorting())},t.prototype.getColClass=function(e){var t=c.COL_CLASS_PREFIX+this.uid;return e?"."+t:t},t.prototype.isPinnedLeft=function(){return"left"===this.renderContainer},t.prototype.isPinnedRight=function(){return"right"===this.renderContainer},t.prototype.getColClassDefinition=function(){return" .grid"+this.grid.id+" "+this.getColClass(!0)+" { min-width: "+this.drawnWidth+"px; max-width: "+this.drawnWidth+"px; }"},t.prototype.getRenderContainer=function(){var e=this.renderContainer;return null!==e&&""!==e&&void 0!==e||(e="body"),this.grid.renderContainers[e]},t.prototype.showColumn=function(){this.colDef.visible=!0},t.prototype.getAggregationText=function(){if(this.colDef.aggregationHideLabel)return"";if(this.colDef.aggregationLabel)return this.colDef.aggregationLabel;switch(this.colDef.aggregationType){case c.aggregationTypes.count:return e.getSafeText("aggregation.count");case c.aggregationTypes.sum:return e.getSafeText("aggregation.sum");case c.aggregationTypes.avg:return e.getSafeText("aggregation.avg");case c.aggregationTypes.min:return e.getSafeText("aggregation.min");case c.aggregationTypes.max:return e.getSafeText("aggregation.max");default:return""}},t.prototype.getCellTemplate=function(){return this.cellTemplatePromise},t.prototype.getCompiledElementFn=function(){return this.compiledElementFnDefer.promise},t}]),angular.module("ui.grid").factory("GridOptions",["gridUtil","uiGridConstants",function(t,r){return{initialize:function(e){return e.onRegisterApi=e.onRegisterApi||angular.noop(),e.data=e.data||[],e.columnDefs=e.columnDefs||[],e.excludeProperties=e.excludeProperties||["\$\$hashKey"],e.enableRowHashing=!1!==e.enableRowHashing,e.rowIdentity=e.rowIdentity||function(e){return t.hashKey(e)},e.getRowIdentity=e.getRowIdentity||function(e){return e.\$\$hashKey},e.flatEntityAccess=!0===e.flatEntityAccess,e.showHeader=void 0===e.showHeader||e.showHeader,e.showHeader?e.headerRowHeight=void 0!==e.headerRowHeight?e.headerRowHeight:30:e.headerRowHeight=0,"string"==typeof e.rowHeight?e.rowHeight=parseInt(e.rowHeight)||30:e.rowHeight=e.rowHeight||30,e.minRowsToShow=void 0!==e.minRowsToShow?e.minRowsToShow:10,e.showGridFooter=!0===e.showGridFooter,e.showColumnFooter=!0===e.showColumnFooter,e.columnFooterHeight=void 0!==e.columnFooterHeight?e.columnFooterHeight:30,e.gridFooterHeight=void 0!==e.gridFooterHeight?e.gridFooterHeight:30,e.columnWidth=void 0!==e.columnWidth?e.columnWidth:50,e.maxVisibleColumnCount=void 0!==e.maxVisibleColumnCount?e.maxVisibleColumnCount:200,e.virtualizationThreshold=void 0!==e.virtualizationThreshold?e.virtualizationThreshold:20,e.columnVirtualizationThreshold=void 0!==e.columnVirtualizationThreshold?e.columnVirtualizationThreshold:10,e.excessRows=void 0!==e.excessRows?e.excessRows:4,e.scrollThreshold=void 0!==e.scrollThreshold?e.scrollThreshold:4,e.excessColumns=void 0!==e.excessColumns?e.excessColumns:4,e.aggregationCalcThrottle=void 0!==e.aggregationCalcThrottle?e.aggregationCalcThrottle:500,e.wheelScrollThrottle=void 0!==e.wheelScrollThrottle?e.wheelScrollThrottle:70,e.scrollDebounce=void 0!==e.scrollDebounce?e.scrollDebounce:300,e.enableSorting=!1!==e.enableSorting,e.enableFiltering=!0===e.enableFiltering,e.enableColumnMenus=!1!==e.enableColumnMenus,e.enableVerticalScrollbar=void 0!==e.enableVerticalScrollbar?e.enableVerticalScrollbar:r.scrollbars.ALWAYS,e.enableHorizontalScrollbar=void 0!==e.enableHorizontalScrollbar?e.enableHorizontalScrollbar:r.scrollbars.ALWAYS,e.enableMinHeightCheck=!1!==e.enableMinHeightCheck,e.minimumColumnSize=void 0!==e.minimumColumnSize?e.minimumColumnSize:30,e.rowEquality=e.rowEquality||function(e,t){return e===t},e.headerTemplate=e.headerTemplate||null,e.footerTemplate=e.footerTemplate||"ui-grid/ui-grid-footer",e.gridFooterTemplate=e.gridFooterTemplate||"ui-grid/ui-grid-grid-footer",e.rowTemplate=e.rowTemplate||"ui-grid/ui-grid-row",e.gridMenuTemplate=e.gridMenuTemplate||"ui-grid/uiGridMenu",e.appScopeProvider=e.appScopeProvider||null,e}}}]),angular.module("ui.grid").factory("GridRenderContainer",["gridUtil","uiGridConstants",function(y,n){function e(e,t,r){var i=this;i.name=e,i.grid=t,i.visibleRowCache=[],i.visibleColumnCache=[],i.renderedRows=[],i.renderedColumns=[],i.prevScrollTop=0,i.prevScrolltopPercentage=0,i.prevRowScrollIndex=0,i.prevScrollLeft=0,i.prevScrollleftPercentage=0,i.prevColumnScrollIndex=0,i.columnStyles="",i.viewportAdjusters=[],i.hasHScrollbar=!1,i.hasVScrollbar=!1,i.canvasHeightShouldUpdate=!0,i.\$\$canvasHeight=0,r&&angular.isObject(r)&&angular.extend(i,r),t.registerStyleComputation({priority:5,func:function(){return i.updateColumnWidths(),i.columnStyles}})}return e.prototype.reset=function(){this.visibleColumnCache.length=0,this.visibleRowCache.length=0,this.renderedRows.length=0,this.renderedColumns.length=0},e.prototype.containsColumn=function(e){return-1!==this.visibleColumnCache.indexOf(e)},e.prototype.minRowsToRender=function(){for(var e=0,t=0,r=this.getViewportHeight(),i=this.visibleRowCache.length-1;t<r&&0<=i;i--)t+=this.visibleRowCache[i].height,e++;return e},e.prototype.minColumnsToRender=function(){for(var e=this.getViewportWidth(),t=0,r=0,i=0;i<this.visibleColumnCache.length;i++){var n=this.visibleColumnCache[i];if(r<e)r+=n.drawnWidth?n.drawnWidth:0,t++;else{for(var o=0,l=i;i-t<=l;l--)o+=this.visibleColumnCache[l].drawnWidth?this.visibleColumnCache[l].drawnWidth:0;o<e&&t++}}return t},e.prototype.getVisibleRowCount=function(){return this.visibleRowCache.length},e.prototype.registerViewportAdjuster=function(e){this.viewportAdjusters.push(e)},e.prototype.removeViewportAdjuster=function(e){var t=this.viewportAdjusters.indexOf(e);-1<t&&this.viewportAdjusters.splice(t,1)},e.prototype.getViewportAdjustment=function(){var t={height:0,width:0};return this.viewportAdjusters.forEach(function(e){t=e.call(this,t)}),t},e.prototype.getMargin=function(r){var i=0;return this.viewportAdjusters.forEach(function(e){var t=e.call(this,{height:0,width:0});t.side&&t.side===r&&(i+=-1*t.width)}),i},e.prototype.getViewportHeight=function(){var e=this,t=e.headerHeight?e.headerHeight:e.grid.headerHeight,r=e.grid.gridHeight-t-e.grid.footerHeight;return r+=e.getViewportAdjustment().height},e.prototype.getViewportWidth=function(){var e=this.grid.gridWidth;return e+=this.getViewportAdjustment().width},e.prototype.getHeaderViewportWidth=function(){return this.getViewportWidth()},e.prototype.getCanvasHeight=function(){var t=this;if(!t.canvasHeightShouldUpdate)return t.\$\$canvasHeight;var e=t.\$\$canvasHeight;return t.\$\$canvasHeight=0,t.visibleRowCache.forEach(function(e){t.\$\$canvasHeight+=e.height}),t.canvasHeightShouldUpdate=!1,t.grid.api.core.raise.canvasHeightChanged(e,t.\$\$canvasHeight),t.\$\$canvasHeight},e.prototype.getVerticalScrollLength=function(){return this.getCanvasHeight()-this.getViewportHeight()+this.grid.scrollbarHeight!==0?this.getCanvasHeight()-this.getViewportHeight()+this.grid.scrollbarHeight:-1},e.prototype.getHorizontalScrollLength=function(){return this.getCanvasWidth()-this.getViewportWidth()+this.grid.scrollbarWidth!==0?this.getCanvasWidth()-this.getViewportWidth()+this.grid.scrollbarWidth:-1},e.prototype.getCanvasWidth=function(){return this.canvasWidth},e.prototype.setRenderedRows=function(e){this.renderedRows.length=e.length;for(var t=0;t<e.length;t++)this.renderedRows[t]=e[t]},e.prototype.setRenderedColumns=function(e){this.renderedColumns.length=e.length;for(var t=0;t<e.length;t++)this.renderedColumns[t]=e[t];this.updateColumnOffset()},e.prototype.updateColumnOffset=function(){for(var e=0,t=0;t<this.currentFirstColumn;t++)e+=this.visibleColumnCache[t].drawnWidth;this.columnOffset=e},e.prototype.scrollVertical=function(e){var t=-1;if(e!==this.prevScrollTop){var r=e-this.prevScrollTop;return 0<r&&(this.grid.scrollDirection=n.scrollDirection.DOWN),r<0&&(this.grid.scrollDirection=n.scrollDirection.UP),1<(t=e/this.getVerticalScrollLength())&&(t=1),t<0&&(t=0),this.adjustScrollVertical(e,t),t}},e.prototype.scrollHorizontal=function(e){var t=-1;if(e!==this.prevScrollLeft){var r=e-this.prevScrollLeft;0<r&&(this.grid.scrollDirection=n.scrollDirection.RIGHT),r<0&&(this.grid.scrollDirection=n.scrollDirection.LEFT);var i=this.getHorizontalScrollLength();return t=0!==i?e/i:0,this.adjustScrollHorizontal(e,t),t}},e.prototype.adjustScrollVertical=function(e,t,r){(this.prevScrollTop!==e||r)&&(void 0!==e&&null!=e||(e=(this.getCanvasHeight()-this.getViewportHeight())*t),this.adjustRows(e,t,!1),this.prevScrollTop=e,this.prevScrolltopPercentage=t,this.grid.queueRefresh())},e.prototype.adjustScrollHorizontal=function(e,t,r){(this.prevScrollLeft!==e||r)&&(void 0!==e&&null!=e||(e=(this.getCanvasWidth()-this.getViewportWidth())*t),this.adjustColumns(e,t),this.prevScrollLeft=e,this.prevScrollleftPercentage=t,this.grid.queueRefresh())},e.prototype.adjustRows=function(e,t,r){var i=this,n=i.minRowsToRender(),o=i.visibleRowCache,l=o.length-n;null==t&&e&&(t=e/i.getVerticalScrollLength());var a=Math.ceil(Math.min(l,l*t));l<a&&(a=l);var s=[];if(o.length>i.grid.options.virtualizationThreshold){if(null!=e){if(!i.grid.suppressParentScrollDown&&i.prevScrollTop<e&&a<i.prevRowScrollIndex+i.grid.options.scrollThreshold&&a<l)return;if(!i.grid.suppressParentScrollUp&&i.prevScrollTop>e&&a>i.prevRowScrollIndex-i.grid.options.scrollThreshold&&a<l)return}s=[Math.max(0,a-i.grid.options.excessRows),Math.min(o.length,a+n+i.grid.options.excessRows)]}else{var d=i.visibleRowCache.length;s=[0,Math.max(d,n+i.grid.options.excessRows)]}i.updateViewableRowRange(s),i.prevRowScrollIndex=a},e.prototype.adjustColumns=function(e,t){var r=this,i=r.minColumnsToRender(),n=r.visibleColumnCache,o=n.length-i;null==t&&e&&(t=e/r.getHorizontalScrollLength());var l=Math.ceil(Math.min(o,o*t));o<l&&(l=o);var a=[];if(n.length>r.grid.options.columnVirtualizationThreshold&&r.getCanvasWidth()>r.getViewportWidth())a=[Math.max(0,l-r.grid.options.excessColumns),Math.min(n.length,l+i+r.grid.options.excessColumns)];else{var s=r.visibleColumnCache.length;a=[0,Math.max(s,i+r.grid.options.excessColumns)]}r.updateViewableColumnRange(a),r.prevColumnScrollIndex=l},e.prototype.updateViewableRowRange=function(e){var t=this.visibleRowCache.slice(e[0],e[1]);this.currentTopRow=e[0],this.setRenderedRows(t)},e.prototype.updateViewableColumnRange=function(e){var t=this.visibleColumnCache.slice(e[0],e[1]);this.currentFirstColumn=e[0],this.setRenderedColumns(t)},e.prototype.headerCellWrapperStyle=function(){if(0!==this.currentFirstColumn){var e=this.columnOffset;return this.grid.isRTL()?{"margin-right":e+"px"}:{"margin-left":e+"px"}}return null},e.prototype.updateColumnWidths=function(){var i=this,n=[],o=0,l=0,t="",a=!1,s=[],d=[],c=0,u=i.grid.getViewportWidth()-i.grid.scrollbarWidth,r=[];angular.forEach(i.grid.renderContainers,function(e){r=r.concat(e.visibleColumnCache)}),r.forEach(function(e){var t=0;if(e.visible)if(a&&(u+=i.grid.scrollbarWidth),!a&&e.colDef.pinnedRight&&(a=!0),angular.isNumber(e.width))t=parseInt(e.width,10),l+=t,e.drawnWidth=t,s.push(e);else if(y.endsWith(e.width,"%")){var r=parseInt(e.width.replace(/%/g,""),10);(t=parseInt(r/100*u))>e.maxWidth&&(t=e.maxWidth),t<e.minWidth&&(t=e.minWidth),l+=t,e.drawnWidth=t,c+=r,d.push(e)}else angular.isString(e.width)&&-1!==e.width.indexOf("*")&&(o+=e.width.length,n.push(e))});var e,g=u-l;if(0<n.length){var h=g/o;n.forEach(function(e){var t=parseInt(e.width.length*h,10);t>e.maxWidth&&(t=e.maxWidth),t<e.minWidth&&(t=e.minWidth),l+=t,e.drawnWidth=t})}if(0<n.length?e=n:0<d.length&&0===s.length&&100===c&&(e=d),!angular.isUndefined(e)){for(var p=function(e){e.drawnWidth<e.maxWidth&&0<f&&(e.drawnWidth++,l++,f--,m=!0)},f=u-l,m=!0;0<f&&m;)m=!1,e.forEach(p);var v=function(e){e.drawnWidth>e.minWidth&&0<C&&(e.drawnWidth--,l--,C--,m=!0)},C=l-u;for(m=!0;0<C&&m;)m=!1,e.forEach(v)}var w=0;i.visibleColumnCache.forEach(function(e){e.visible&&(w+=e.drawnWidth)}),r.forEach(function(e){t+=e.getColClassDefinition()}),i.canvasWidth=w,this.columnStyles=t},e.prototype.needsHScrollbarPlaceholder=function(){var e;return("left"===this.name||"right"===this.name&&!this.hasHScrollbar&&!this.grid.disableScrolling)&&(this.grid.options.enableHorizontalScrollbar===n.scrollbars.ALWAYS||(e=this.grid.element[0].querySelector(".ui-grid-render-container-body .ui-grid-viewport")).scrollWidth>e.offsetWidth)},e.prototype.getViewportStyle=function(){var e=this,t={},r={};return r[n.scrollbars.ALWAYS]="scroll",r[n.scrollbars.WHEN_NEEDED]="auto",e.hasHScrollbar=!1,e.hasVScrollbar=!1,e.grid.disableScrolling?(t["overflow-x"]="hidden",t["overflow-y"]="hidden"):("body"===e.name?(e.hasHScrollbar=e.grid.options.enableHorizontalScrollbar!==n.scrollbars.NEVER,e.grid.isRTL()?e.grid.hasLeftContainerColumns()||(e.hasVScrollbar=e.grid.options.enableVerticalScrollbar!==n.scrollbars.NEVER):e.grid.hasRightContainerColumns()||(e.hasVScrollbar=e.grid.options.enableVerticalScrollbar!==n.scrollbars.NEVER)):"left"===e.name?e.hasVScrollbar=!!e.grid.isRTL()&&e.grid.options.enableVerticalScrollbar!==n.scrollbars.NEVER:e.hasVScrollbar=!e.grid.isRTL()&&e.grid.options.enableVerticalScrollbar!==n.scrollbars.NEVER,t["overflow-x"]=e.hasHScrollbar?r[e.grid.options.enableHorizontalScrollbar]:"hidden",t["overflow-y"]=e.hasVScrollbar?r[e.grid.options.enableVerticalScrollbar]:"hidden"),t},e}]),angular.module("ui.grid").factory("GridRow",["gridUtil","uiGridConstants",function(i,t){function e(e,t,r){this.grid=r,this.entity=e,this.uid=i.nextUid(),this.visible=!0,this.isSelected=!1,this.\$\$height=r.options.rowHeight}return Object.defineProperty(e.prototype,"height",{get:function(){return this.\$\$height},set:function(e){e!==this.\$\$height&&(this.grid.updateCanvasHeight(),this.\$\$height=e)}}),e.prototype.getQualifiedColField=function(e){return"row."+this.getEntityQualifiedColField(e)},e.prototype.getEntityQualifiedColField=function(e){return e.field===t.ENTITY_BINDING?"entity":i.preEval("entity."+e.field)},e.prototype.setRowInvisible=function(e){e&&e.setThisRowInvisible&&e.setThisRowInvisible("user")},e.prototype.clearRowInvisible=function(e){e&&e.clearThisRowInvisible&&e.clearThisRowInvisible("user")},e.prototype.setThisRowInvisible=function(e,t){this.invisibleReason||(this.invisibleReason={}),this.invisibleReason[e]=!0,this.evaluateRowVisibility(t)},e.prototype.clearThisRowInvisible=function(e,t){void 0!==this.invisibleReason&&delete this.invisibleReason[e],this.evaluateRowVisibility(t)},e.prototype.evaluateRowVisibility=function(e){var r=!0;void 0!==this.invisibleReason&&angular.forEach(this.invisibleReason,function(e,t){e&&(r=!1)}),void 0!==this.visible&&this.visible===r||(this.visible=r,e||(this.grid.queueGridRefresh(),this.grid.api.core.raise.rowsVisibleChanged(this)))},e}]),function(){"use strict";angular.module("ui.grid").factory("GridRowColumn",["\$parse","\$filter",function(e,t){var r=function e(t,r){if(!(this instanceof e))throw"Using GridRowColumn as a function insead of as a constructor. Must be called with \`new\` keyword";this.row=t,this.col=r};return r.prototype.getIntersectionValueRaw=function(){return e(this.row.getEntityQualifiedColField(this.col))(this.row)},r}])}(),angular.module("ui.grid").factory("ScrollEvent",["gridUtil",function(l){function e(e,t,r,i){var n=this;if(!e)throw new Error("grid argument is required");n.grid=e,n.source=i,n.withDelay=!0,n.sourceRowContainer=t,n.sourceColContainer=r,n.newScrollLeft=null,n.newScrollTop=null,n.x=null,n.y=null,n.verticalScrollLength=-9999999,n.horizontalScrollLength=-999999,n.fireThrottledScrollingEvent=l.throttle(function(e){n.grid.scrollContainers(e,n)},n.grid.options.wheelScrollThrottle,{trailing:!0})}return e.prototype.getNewScrollLeft=function(e,t){var r=this;if(!r.newScrollLeft){var i,n=e.getCanvasWidth()-e.getViewportWidth(),o=l.normalizeScrollLeft(t,r.grid);if(void 0!==r.x.percentage&&void 0!==r.x.percentage)i=r.x.percentage;else{if(void 0===r.x.pixels||void 0===r.x.pixels)throw new Error("No percentage or pixel value provided for scroll event X axis");i=r.x.percentage=(o+r.x.pixels)/n}return Math.max(0,i*n)}return r.newScrollLeft},e.prototype.getNewScrollTop=function(e,t){var r=this;if(!r.newScrollTop){var i,n=e.getVerticalScrollLength(),o=t[0].scrollTop;if(void 0!==r.y.percentage&&void 0!==r.y.percentage)i=r.y.percentage;else{if(void 0===r.y.pixels||void 0===r.y.pixels)throw new Error("No percentage or pixel value provided for scroll event Y axis");i=r.y.percentage=(o+r.y.pixels)/n}return Math.max(0,i*n)}return r.newScrollTop},e.prototype.atTop=function(e){return this.y&&(0===this.y.percentage||this.verticalScrollLength<0)&&0===e},e.prototype.atBottom=function(e){return this.y&&(1===this.y.percentage||0===this.verticalScrollLength)&&0<e},e.prototype.atLeft=function(e){return this.x&&(0===this.x.percentage||this.horizontalScrollLength<0)&&0===e},e.prototype.atRight=function(e){return this.x&&(1===this.x.percentage||0===this.horizontalScrollLength)&&0<e},e.Sources={ViewPortScroll:"ViewPortScroll",RenderContainerMouseWheel:"RenderContainerMouseWheel",RenderContainerTouchMove:"RenderContainerTouchMove",Other:99},e}]),function(){"use strict";angular.module("ui.grid").service("gridClassFactory",["gridUtil","\$q","\$compile","\$templateCache","uiGridConstants","Grid","GridColumn","GridRow",function(d,i,n,e,c,o,t,r){var l={createGrid:function(e){(e=void 0!==e?e:{}).id=d.newId();var t=new o(e);if(t.options.rowTemplate){var r=i.defer();t.getRowTemplateFn=r.promise,d.getTemplate(t.options.rowTemplate).then(function(e){var t=n(e);r.resolve(t)},function(){throw new Error("Couldn't fetch/use row template '"+t.options.rowTemplate+"'")}).catch(angular.noop)}return t.registerColumnBuilder(l.defaultColumnBuilder),t.registerRowBuilder(l.rowTemplateAssigner),t.registerRowsProcessor(function(e){return e.forEach(function(e){e.evaluateRowVisibility(!0)}),e},50),t.registerColumnsProcessor(function(e){return e.forEach(function(e){e.visible=!angular.isDefined(e.colDef.visible)||e.colDef.visible}),e},50),t.registerRowsProcessor(t.searchRows,100),t.options.externalSort&&angular.isFunction(t.options.externalSort)?t.registerRowsProcessor(t.options.externalSort,200):t.registerRowsProcessor(t.sortByColumn,200),t},defaultColumnBuilder:function(l,a,e){var s=[],t=function(r,e,t,i,n){l[r]?a[e]=l[r]:a[e]=t;var o=d.getTemplate(a[e]).then(function(e){angular.isFunction(e)&&(e=e());var t="cellTooltip"===n?"col.cellTooltip(row,col)":"col.headerTooltip(col)";n&&!1===a[n]?e=e.replace(c.TOOLTIP,""):n&&a[n]&&(e=e.replace(c.TOOLTIP,'title="{{'+t+' CUSTOM_FILTERS }}"')),a[r]=i?e.replace(c.CUSTOM_FILTERS,function(){return a[i]?"|"+a[i]:""}):e},function(){throw new Error("Couldn't fetch/use colDef."+r+" '"+l[r]+"'")}).catch(angular.noop);return s.push(o),o};return a.cellTemplatePromise=t("cellTemplate","providedCellTemplate","ui-grid/uiGridCell","cellFilter","cellTooltip"),a.headerCellTemplatePromise=t("headerCellTemplate","providedHeaderCellTemplate","ui-grid/uiGridHeaderCell","headerCellFilter","headerTooltip"),a.footerCellTemplatePromise=t("footerCellTemplate","providedFooterCellTemplate","ui-grid/uiGridFooterCell","footerCellFilter"),a.filterHeaderTemplatePromise=t("filterHeaderTemplate","providedFilterHeaderTemplate","ui-grid/ui-grid-filter"),a.compiledElementFnDefer=i.defer(),i.all(s)},rowTemplateAssigner:function(e){if(e.rowTemplate){var r=i.defer();e.getRowTemplateFn=r.promise,d.getTemplate(e.rowTemplate).then(function(e){var t=n(e);r.resolve(t)},function(){throw new Error("Couldn't fetch/use row template '"+e.rowTemplate+"'")})}else e.rowTemplate=this.options.rowTemplate,e.getRowTemplateFn=this.getRowTemplateFn;return e.getRowTemplateFn}};return l}])}(),angular.module("ui.grid").service("rowSearcher",["gridUtil","uiGridConstants",function(u,s){var n=s.filter.CONTAINS,g={getTerm:function(e){if(void 0===e.term)return e.term;var t=e.term;return"string"==typeof t&&(t=t.trim()),t},stripTerm:function(e){var t=g.getTerm(e);return"string"==typeof t?t.replace(/(^\\*|\\*\$)/g,"").replace(/[\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\\$\\|]/g,"\\\\\$&"):t},guessCondition:function(e){if(void 0===e.term||!e.term)return n;var t=g.getTerm(e);if(/\\*/.test(t)){var r="";e.flags&&e.flags.caseSensitive||(r+="i");var i=t.replace(/(\\\\)?\\*/g,function(e,t){return t?e:"[\\\\s\\\\S]*?"});return new RegExp("^"+i+"\$",r)}return n},setupFilters:function(e){for(var t=[],r=e.length,i=0;i<r;i++){var n=e[i];if(n.noTerm||!u.isNullOrUndefined(n.term)){var o={},l="";n.flags&&n.flags.caseSensitive||(l+="i"),u.isNullOrUndefined(n.term)||(n.rawTerm?o.term=n.term:o.term=g.stripTerm(n)),o.noTerm=n.noTerm,n.condition?o.condition=n.condition:o.condition=g.guessCondition(n),o.flags=angular.extend({caseSensitive:!1,date:!1},n.flags),o.condition===s.filter.STARTS_WITH&&(o.startswithRE=new RegExp("^"+o.term,l)),o.condition===s.filter.ENDS_WITH&&(o.endswithRE=new RegExp(o.term+"\$",l)),o.condition===s.filter.CONTAINS&&(o.containsRE=new RegExp(o.term,l)),o.condition===s.filter.EXACT&&(o.exactRE=new RegExp("^"+o.term+"\$",l)),t.push(o)}}return t},runColumnFilter:function(e,t,r,i){var n,o=typeof i.condition,l=i.term;if(n=r.filterCellFiltered?e.getCellDisplayValue(t,r):e.getCellValue(t,r),i.condition instanceof RegExp)return i.condition.test(n);if("function"===o)return i.condition(l,n,t,r);if(i.startswithRE)return i.startswithRE.test(n);if(i.endswithRE)return i.endswithRE.test(n);if(i.containsRE)return i.containsRE.test(n);if(i.exactRE)return i.exactRE.test(n);if(i.condition===s.filter.NOT_EQUAL)return!new RegExp("^"+l+"\$").exec(n);if("number"==typeof n&&"string"==typeof l){var a=parseFloat(l.replace(/\\\\\\./,".").replace(/\\\\\\-/,"-"));isNaN(a)||(l=a)}return!0===i.flags.date&&(n=new Date(n),l=new Date(l.replace(/\\\\/g,""))),i.condition===s.filter.GREATER_THAN?l<n:i.condition===s.filter.GREATER_THAN_OR_EQUAL?l<=n:i.condition===s.filter.LESS_THAN?n<l:i.condition!==s.filter.LESS_THAN_OR_EQUAL||n<=l},searchColumn:function(e,t,r,i){if(e.options.useExternalFiltering)return!0;for(var n=i.length,o=0;o<n;o++){var l=i[o];if((!u.isNullOrUndefined(l.term)&&""!==l.term||l.noTerm)&&!g.runColumnFilter(e,t,r,l))return!1}return!0},search:function(e,s,t){if(s){if(!e.options.enableFiltering)return s;for(var r=[],i=t.length,n=function(e){var t=!1;return e.forEach(function(e){(!u.isNullOrUndefined(e.term)&&""!==e.term||e.noTerm)&&(t=!0)}),t},o=0;o<i;o++){var l=t[o];void 0!==l.filters&&n(l.filters)&&r.push({col:l,filters:g.setupFilters(l.filters)})}if(0<r.length){for(var a=function(e,t){for(var r,i,n,o,l=s.length,a=0;a<l;a++)r=e,i=s[a],n=t.col,o=t.filters,i.visible&&!g.searchColumn(r,i,n,o)&&(i.visible=!1)},d=r.length,c=0;c<d;c++)a(e,r[c]);e.api.core.raise.rowsVisibleChanged&&e.api.core.raise.rowsVisibleChanged()}return s}}};return g}]),angular.module("ui.grid").service("rowSorter",["\$parse","uiGridConstants",function(e,v){var t="("+v.CURRENCY_SYMBOLS.map(function(e){return"\\\\"+e}).join("|")+")?",C=(new RegExp("^[-+]?"+t+"[\\\\d,.]+"+t+"%?\$"),{colSortFnCache:{}});return C.guessSortFn=function(e){switch(e){case"number":return C.sortNumber;case"numberStr":return C.sortNumberStr;case"boolean":return C.sortBool;case"string":return C.sortAlpha;case"date":return C.sortDate;case"object":return C.basicSort;default:throw new Error("No sorting function found for type: "+e)}},C.handleNulls=function(e,t){if(!e&&0!==e&&!1!==e||!t&&0!==t&&!1!==t){if(!e&&0!==e&&!1!==e&&!t&&0!==t&&!1!==t)return 0;if(!e&&0!==e&&!1!==e)return 1;if(!t&&0!==t&&!1!==t)return-1}return null},C.basicSort=function(e,t){var r=C.handleNulls(e,t);return null!==r?r:e===t?0:e<t?-1:1},C.sortNumber=function(e,t){var r=C.handleNulls(e,t);return null!==r?r:e-t},C.sortNumberStr=function(e,t){var r=C.handleNulls(e,t);if(null!==r)return r;var i,n,o=!1,l=!1;return i=parseFloat(e.replace(/[^0-9.-]/g,"")),isNaN(i)&&(o=!0),n=parseFloat(t.replace(/[^0-9.-]/g,"")),isNaN(n)&&(l=!0),o&&l?0:o?1:l?-1:i-n},C.sortAlpha=function(e,t){var r=C.handleNulls(e,t);if(null!==r)return r;var i=e.toString().toLowerCase(),n=t.toString().toLowerCase();return i===n?0:i.localeCompare(n)},C.sortDate=function(e,t){var r=C.handleNulls(e,t);if(null!==r)return r;e instanceof Date||(e=new Date(e)),t instanceof Date||(t=new Date(t));var i=e.getTime(),n=t.getTime();return i===n?0:i<n?-1:1},C.sortBool=function(e,t){var r=C.handleNulls(e,t);return null!==r?r:e&&t?0:e||t?e?1:-1:0},C.getSortFn=function(e,t,r){var i;return C.colSortFnCache[t.colDef.name]?i=C.colSortFnCache[t.colDef.name]:void 0!==t.sortingAlgorithm?(i=t.sortingAlgorithm,C.colSortFnCache[t.colDef.name]=t.sortingAlgorithm):t.sortCellFiltered&&t.cellFilter?(i=C.sortAlpha,C.colSortFnCache[t.colDef.name]=i):(i=C.guessSortFn(t.colDef.type))?C.colSortFnCache[t.colDef.name]=i:i=C.sortAlpha,i},C.prioritySort=function(e,t){return e.sort&&void 0!==e.sort.priority&&t.sort&&void 0!==t.sort.priority?e.sort.priority<t.sort.priority?-1:e.sort.priority===t.sort.priority?0:1:e.sort&&void 0!==e.sort.priority?-1:t.sort&&void 0!==t.sort.priority?1:0},C.sort=function(g,e,t){if(e){if(g.options.useExternalSorting)return e;var h,p,f=[],r=[];if(t.forEach(function(e){!e.sort||e.sort.ignoreSort||!e.sort.direction||e.sort.direction!==v.ASC&&e.sort.direction!==v.DESC?e.defaultSort&&e.defaultSort.direction&&(e.defaultSort.direction===v.ASC||e.defaultSort.direction===v.DESC)&&r.push({col:e,sort:e.defaultSort}):f.push({col:e,sort:e.sort})}),f=f.sort(C.prioritySort),r=r.sort(C.prioritySort),0===(f=f.concat(r)).length)return e;e.forEach(function(e,t){e.entity.\$\$uiGridIndex=t});var m=e.slice(0),i=e.sort(function(e,t){for(var r,i=0,n=0;0===i&&n<f.length;){h=f[n].col,p=f[n].sort.direction,r=C.getSortFn(g,h,m);var o=(l=g,a=e,s=t,u=c=void 0,(d=h).sortCellFiltered?(c=l.getCellDisplayValue(a,d),u=l.getCellDisplayValue(s,d)):(c=l.getCellValue(a,d),u=l.getCellValue(s,d)),[c,u]);i=r(o[0],o[1],e,t,p,h),n++}var l,a,s,d,c,u;return 0===i?e.entity.\$\$uiGridIndex-t.entity.\$\$uiGridIndex:p===v.ASC?i:0-i});return e.forEach(function(e,t){delete e.entity.\$\$uiGridIndex}),i}},C}]),function(){var C,e=angular.module("ui.grid");function w(e){var t=e;return void 0!==t.length&&t.length&&(t=e[0]),t.ownerDocument.defaultView.getComputedStyle(t,null)}"function"!=typeof Function.prototype.bind&&(C=function(){var i=Array.prototype.slice;return function(e){var t=this,r=i.call(arguments,1);return r.length?function(){return arguments.length?t.apply(e,r.concat(i.call(arguments))):t.apply(e,r)}:function(){return arguments.length?t.apply(e,arguments):t.call(e)}}});var a=new RegExp("^("+/[+-]?(?:\\d*\\.|)\\d+(?:[eE][+-]?\\d+|)/.source+")(?!px)[a-z%]+\$","i"),y=/^(block|none|table(?!-c[ea]).+)/,b={position:"absolute",visibility:"hidden",display:"block"};function S(e,t,r,i,n){for(var o=r===(i?"border":"content")?4:"width"===t?1:0,l=0,a=["Top","Right","Bottom","Left"];o<4;o+=2){var s=a[o];if("margin"===r){var d=parseFloat(n[r+s]);isNaN(d)||(l+=d)}if(i){if("content"===r){var c=parseFloat(n["padding"+s]);isNaN(c)||(l-=c)}if("margin"!==r){var u=parseFloat(n["border"+s+"Width"]);isNaN(u)||(l-=u)}}else{var g=parseFloat(n["padding"+s]);if(isNaN(g)||(l+=g),"padding"!==r){var h=parseFloat(n["border"+s+"Width"]);isNaN(h)||(l+=h)}}}return l}function E(e,t,r){var i,n=!0,o=w(e),l="border-box"===o.boxSizing;if(i<=0||null==i){if(((i=o[t])<0||null==i)&&(i=e.style[t]),a.test(i))return i;n=l&&!0,i=parseFloat(i)||0}return i+S(0,t,r||(l?"border":"content"),n,o)}var T=["0","0","0","0"],R="uiGrid-";e.service("gridUtil",["\$log","\$window","\$document","\$http","\$templateCache","\$timeout","\$interval","\$injector","\$q","\$interpolate","uiGridConstants",function(t,n,r,e,i,s,d,o,l,a,c){var u,g={augmentWidthOrHeight:S,getStyles:w,createBoundedWrapper:function(e,t){return function(){return t.apply(e,arguments)}},readableColumnName:function(e){return void 0===e||null==e?e:("string"!=typeof e&&(e=String(e)),e.replace(/_+/g," ").replace(/^[A-Z]+\$/,function(e){return e.toLowerCase()}).replace(/([\\w\\u00C0-\\u017F]+)/g,function(e){return e.charAt(0).toUpperCase()+e.slice(1)}).replace(/(\\w+?(?=[A-Z]))/g,"\$1 "))},getColumnsFromData:function(e,r){var i=[];if(!e||void 0===e[0]||void 0===e[0])return[];angular.isUndefined(r)&&(r=[]);var t=e[0];return angular.forEach(t,function(e,t){-1===r.indexOf(t)&&i.push({name:t})}),i},newId:(u=(new Date).getTime(),function(){return u+=1}),getTemplate:function(r){if(i.get(r))return g.postProcessTemplate(i.get(r));if(angular.isFunction(r.then))return r.then(g.postProcessTemplate).catch(angular.noop);try{if(0<angular.element(r).length)return l.when(r).then(g.postProcessTemplate).catch(angular.noop)}catch(e){}return e({method:"GET",url:r}).then(function(e){var t=e.data.trim();return i.put(r,t),t},function(e){throw new Error("Could not get template "+r+": "+e)}).then(g.postProcessTemplate).catch(angular.noop)},postProcessTemplate:function(e){var t=a.startSymbol(),r=a.endSymbol();return"{{"===t&&"}}"===r||(e=(e=e.replace(/\\{\\{/g,t)).replace(/\\}\\}/g,r)),l.when(e)},guessType:function(e){var t=typeof e;switch(t){case"number":case"boolean":case"string":return t;default:return angular.isDate(e)?"date":"object"}},elementWidth:function(e){},elementHeight:function(e){},getScrollbarWidth:function(){var e=document.createElement("div");e.style.visibility="hidden",e.style.width="100px",e.style.msOverflowStyle="scrollbar",document.body.appendChild(e);var t=e.offsetWidth;e.style.overflow="scroll";var r=document.createElement("div");r.style.width="100%",e.appendChild(r);var i=r.offsetWidth;return e.parentNode.removeChild(e),t-i},swap:function(e,t,r,i){var n,o,l={};for(o in t)l[o]=e.style[o],e.style[o]=t[o];for(o in n=r.apply(e,i||[]),t)e.style[o]=l[o];return n},fakeElement:function(e,t,r,i){var n,o,l=angular.element(e).clone()[0];for(o in t)l.style[o]=t[o];return angular.element(document.body).append(l),n=r.call(l,l),angular.element(l).remove(),n},normalizeWheelEvent:function(e){var t,r,i,n,o,l=e||window.event,a=([].slice.call(arguments,1),0),s=0,d=0;return l.originalEvent&&(l=l.originalEvent),l.wheelDelta&&(a=l.wheelDelta),l.detail&&(a=-1*l.detail),d=a,void 0!==l.axis&&l.axis===l.HORIZONTAL_AXIS&&(d=0,s=-1*a),l.deltaY&&(a=d=-1*l.deltaY),l.deltaX&&(a=-1*(s=l.deltaX)),void 0!==l.wheelDeltaY&&(d=l.wheelDeltaY),void 0!==l.wheelDeltaX&&(s=l.wheelDeltaX),i=Math.abs(a),(!t||i<t)&&(t=i),n=Math.max(Math.abs(d),Math.abs(s)),(!r||n<r)&&(r=n),o=0<a?"floor":"ceil",{delta:a=Math[o](a/t),deltaX:s=Math[o](s/r),deltaY:d=Math[o](d/r)}},isTouchEnabled:function(){var e;return("ontouchstart"in n||n.DocumentTouch&&r instanceof DocumentTouch)&&(e=!0),e},isNullOrUndefined:function(e){return null==e},endsWith:function(e,t){return!(!e||!t||"string"!=typeof e)&&-1!==e.indexOf(t,e.length-t.length)},arrayContainsObjectWithProperty:function(e,t,r){var i=!1;return angular.forEach(e,function(e){e[t]===r&&(i=!0)}),i},numericAndNullSort:function(e,t){return null===e?1:null===t?-1:null===e&&null===t?0:e-t},disableAnimations:function(e){var t;try{t=o.get("\$animate"),1<angular.version.major||1===angular.version.major&&4<=angular.version.minor?t.enabled(e,!1):t.enabled(!1,e)}catch(e){}},enableAnimations:function(e){var t;try{return t=o.get("\$animate"),1<angular.version.major||1===angular.version.major&&4<=angular.version.minor?t.enabled(e,!0):t.enabled(!0,e),t}catch(e){}},nextUid:function(){for(var e,t=T.length;t;){if(57===(e=T[--t].charCodeAt(0)))return T[t]="A",R+T.join("");if(90!==e)return T[t]=String.fromCharCode(e+1),R+T.join("");T[t]="0"}return T.unshift("0"),R+T.join("")},hashKey:function(e){var t,r=typeof e;return"object"===r&&null!==e?"function"==typeof(t=e.\$\$hashKey)?t=e.\$\$hashKey():void 0!==e.\$\$hashKey&&e.\$\$hashKey?t=e.\$\$hashKey:void 0===t&&(t=e.\$\$hashKey=g.nextUid()):t=e,r+": "+t},resetUids:function(){T=["0","0","0"]},logError:function(e){c.LOG_ERROR_MESSAGES&&t.error(e)},logWarn:function(e){c.LOG_WARN_MESSAGES&&t.warn(e)},logDebug:function(){c.LOG_DEBUG_MESSAGES&&t.debug.apply(t,arguments)}};g.focus={queue:[],byId:function(r,i){this._purgeQueue();var e=s(function(){var e=(i&&i.id?i.id+"-":"")+r,t=n.document.getElementById(e);t?t.focus():g.logWarn("[focus.byId] Element id "+e+" was not found.")},0,!1);return this.queue.push(e),e},byElement:function(e){if(!angular.isElement(e))return g.logWarn("Trying to focus on an element that isn't an element."),l.reject("not-element");e=angular.element(e),this._purgeQueue();var t=s(function(){e&&e[0].focus()},0,!1);return this.queue.push(t),t},bySelector:function(t,r,e){var i=this;if(!angular.isElement(t))throw new Error("The parent element is not an element.");t=angular.element(t);var n=function(){var e=t[0].querySelector(r);return i.byElement(e)};if(this._purgeQueue(),e){var o=s(n,0,!1);return this.queue.push(o),o}return n()},_purgeQueue:function(){this.queue.forEach(function(e){s.cancel(e)}),this.queue=[]}},["width","height"].forEach(function(n){var r=n.charAt(0).toUpperCase()+n.substr(1);g["element"+r]=function(e,t){var r=e;if(r&&void 0!==r.length&&r.length&&(r=e[0]),r&&null!==r){var i=w(r);return 0===r.offsetWidth&&y.test(i.display)?g.swap(r,b,function(){return E(r,n,t)}):E(r,n,t)}return null},g["outerElement"+r]=function(e,t){return e?g["element"+r].call(this,e,t?"margin":"border"):null}}),g.closestElm=function(e,t){var r,i;for(void 0!==e.length&&e.length&&(e=e[0]),["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"].some(function(e){return"function"==typeof document.body[e]&&(r=e,!0)});null!==e;){if(null!==(i=e.parentElement)&&i[r](t))return i;e=i}return null},g.type=function(e){return Function.prototype.toString.call(e.constructor).match(/function (.*?)\\(/)[1]},g.getBorderSize=function(e,t){void 0!==e.length&&e.length&&(e=e[0]);var r=w(e);t=t?"border"+t.charAt(0).toUpperCase()+t.slice(1):"border",t+="Width";var i=parseInt(r[t],10);return isNaN(i)?0:i},g.detectBrowser=function(){var e=n.navigator.userAgent,t={chrome:/chrome/i,safari:/safari/i,firefox:/firefox/i,ie:/internet explorer|trident\\//i};for(var r in t)if(t[r].test(e))return r;return"unknown"},g.rtlScrollType=function e(){if(e.type)return e.type;var t=angular.element('<div dir="rtl" style="font-size: 14px; width: 1px; height: 1px; position: absolute; top: -1000px; overflow: scroll">A</div>')[0],r="reverse";return document.body.appendChild(t),0<t.scrollLeft?r="default":(t.scrollLeft=1,0===t.scrollLeft&&(r="negative")),angular.element(t).remove(),e.type=r},g.normalizeScrollLeft=function(e,t){void 0!==e.length&&e.length&&(e=e[0]);var r=e.scrollLeft;if(t.isRTL())switch(g.rtlScrollType()){case"default":return e.scrollWidth-r-e.clientWidth;case"negative":return Math.abs(r);case"reverse":return r}return r},g.denormalizeScrollLeft=function(e,t,r){if(void 0!==e.length&&e.length&&(e=e[0]),r.isRTL())switch(g.rtlScrollType()){case"default":return e.scrollWidth-e.clientWidth-t;case"negative":return-1*t;case"reverse":return t}return t},g.preEval=function(e){var t=c.BRACKET_REGEXP.exec(e);if(t)return(t[1]?g.preEval(t[1]):t[1])+t[2]+(t[3]?g.preEval(t[3]):t[3]);var r=(e=e.replace(c.APOS_REGEXP,"\\\\'")).split(c.DOT_REGEXP),i=[r.shift()];return angular.forEach(r,function(e){i.push(e.replace(c.FUNC_REGEXP,"']\$1"))}),i.join("['")},g.debounce=function(t,r,i){var n,o,l,a;function e(){l=this,o=arguments;var e=i&&!n;return n&&s.cancel(n),n=s(function(){n=null,i||(a=t.apply(l,o))},r,!1),e&&(a=t.apply(l,o)),a}return e.cancel=function(){s.cancel(n),n=null},e},g.throttle=function(t,r,i){i=i||{};var n,o,l=0,a=null;function s(e){l=+new Date,t.apply(n,o),d(function(){a=null},0,1,!1)}return function(){if(n=this,o=arguments,null===a){var e=+new Date-l;r<e?s():i.trailing&&(a=d(s,r-e,1,!1))}}},g.on={},g.off={},g._events={},g.addOff=function(i){g.off[i]=function(e,t){var r=g._events[i].indexOf(t);0<r&&g._events[i].removeAt(r)}};var h,p,f="onwheel"in document||9<=document.documentMode?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"];function m(e,t){var r,i=angular.element(this),n=0,o=0,l=0;if(t.originalEvent&&(t=t.originalEvent),"detail"in t&&(l=-1*t.detail),"wheelDelta"in t&&(l=t.wheelDelta),"wheelDeltaY"in t&&(l=t.wheelDeltaY),"wheelDeltaX"in t&&(o=-1*t.wheelDeltaX),"axis"in t&&t.axis===t.HORIZONTAL_AXIS&&(o=-1*l,l=0),n=0===l?o:l,"deltaY"in t&&(n=l=-1*t.deltaY),"deltaX"in t&&(o=t.deltaX,0===l&&(n=-1*o)),0!==l||0!==o){if(1===t.deltaMode){var a=i.data("mousewheel-line-height");n*=a,l*=a,o*=a}else if(2===t.deltaMode){var s=i.data("mousewheel-page-height");n*=s,l*=s,o*=s}var d;r=Math.max(Math.abs(l),Math.abs(o)),(!p||r<p)&&(d=p=r,"mousewheel"===t.type&&d%120==0&&(p/=40)),n=Math[1<=n?"floor":"ceil"](n/p),o=Math[1<=o?"floor":"ceil"](o/p),l=Math[1<=l?"floor":"ceil"](l/p);var c={originalEvent:t,deltaX:o,deltaY:l,deltaFactor:p,preventDefault:function(){t.preventDefault()},stopPropagation:function(){t.stopPropagation()}};h&&clearTimeout(h),h=setTimeout(v,200),e.call(i[0],c)}}function v(){p=null}return g.on.mousewheel=function(e,t){if(e&&t){var r,i,n=angular.element(e);n.data("mousewheel-line-height",(r=n,(i=(r=angular.element(r)[0]).parentElement)||(i=document.getElementsByTagName("body")[0]),parseInt(w(i).fontSize)||parseInt(w(r).fontSize)||16)),n.data("mousewheel-page-height",g.elementHeight(n)),n.data("mousewheel-callbacks")||n.data("mousewheel-callbacks",{});var o=n.data("mousewheel-callbacks");o[t]=(Function.prototype.bind||C).call(m,n[0],t);for(var l=f.length;l;)n.on(f[--l],o[t]);n.on("\$destroy",function(){for(var e=f.length;e;)n.off(f[--e],o[t])})}},g.off.mousewheel=function(e,t){var r=angular.element(e),i=r.data("mousewheel-callbacks"),n=i[t];if(n)for(var o=f.length;o;)r.off(f[--o],n);delete i[t],0===Object.keys(i).length&&(r.removeData("mousewheel-line-height"),r.removeData("mousewheel-page-height"),r.removeData("mousewheel-callbacks"))},g}]),e.filter("px",function(){return function(e){return e.match(/^[\\d\\.]+\$/)?e+"px":e}})}(),function(){var g=["uiT","uiTranslate"],t=angular.module("ui.grid.i18n");function r(c,u){return{restrict:"EA",compile:function(){return{pre:function(e,r,t){var i,n,o,l=g[0],a=g[1],s=t[l]||t[a]||r.html();function d(e){var t=c.getSafeText(e);r.html(t)}t.\$\$observers&&(o=t[l]?l:a,n=t.\$observe(o,function(e){e&&d(e)})),i=e.\$on(u.UPDATE_EVENT,function(){n?n(t[l]||t[a]):d(s)}),e.\$on("\$destroy",i),d(s)}}}}}function i(r){return function(e,t){return r.getSafeText(e,t)}}t.constant("i18nConstants",{MISSING:"[MISSING]",UPDATE_EVENT:"\$uiI18n",LOCALE_DIRECTIVE_ALIAS:"uiI18n",DEFAULT_LANG:"en"}),t.service("i18nService",["\$log","\$parse","i18nConstants","\$rootScope",function(e,l,a,t){var s={_langs:{},current:null,fallback:a.DEFAULT_LANG,get:function(e){var t=this,r=t.getFallbackLang();return e!==t.fallback?angular.extend({},t._langs[r],t._langs[e.toLowerCase()]):t._langs[e.toLowerCase()]},add:function(e,t){var r=e.toLowerCase();this._langs[r]||(this._langs[r]={}),angular.merge(this._langs[r],t)},getAllLangs:function(){var e=[];if(!this._langs)return e;for(var t in this._langs)e.push(t);return e},setCurrent:function(e){this.current=e.toLowerCase()},setFallback:function(e){this.fallback=e.toLowerCase()},getCurrentLang:function(){return this.current},getFallbackLang:function(){return this.fallback.toLowerCase()}},d={add:function(e,t){"object"==typeof e?angular.forEach(e,function(e){e&&s.add(e,t)}):s.add(e,t)},getAllLangs:function(){return s.getAllLangs()},get:function(e){var t=e||d.getCurrentLang();return s.get(t)},getSafeText:function(e,t){var r=t||d.getCurrentLang(),i=s.get(r),n=a.MISSING+e,o=l(e);return i&&o(i)||n},setCurrentLang:function(e){e&&(s.setCurrent(e),t.\$broadcast(a.UPDATE_EVENT))},setFallbackLang:function(e){e&&s.setFallback(e)},getCurrentLang:function(){var e=s.getCurrentLang();return e||(e=a.DEFAULT_LANG,s.setCurrent(e)),e},getFallbackLang:function(){return s.getFallbackLang()}};return d}]),t.directive("uiI18n",["i18nService","i18nConstants",function(o,l){return{compile:function(){return{pre:function(e,t,r){var i=l.LOCALE_DIRECTIVE_ALIAS,n=e.\$eval(r[i]);n?e.\$watch(r[i],function(){o.setCurrentLang(n)}):r.\$\$observers&&r.\$observe(i,function(){o.setCurrentLang(r[i]||l.DEFAULT_LANG)})}}}}}]),angular.forEach(g,function(e){t.directive(e,["i18nService","i18nConstants",r])}),angular.forEach(["t","uiTranslate"],function(e){t.filter(e,["i18nService",i])})}(),angular.module("ui.grid").config(["\$provide",function(e){e.decorator("i18nService",["\$delegate",function(e){return e.add("en",{headerCell:{aria:{defaultFilterLabel:"Filter for column",removeFilter:"Remove Filter",columnMenuButtonLabel:"Column Menu",column:"Column"},priority:"Priority:",filterLabel:"Filter for column: "},aggregate:{label:"items"},groupPanel:{description:"Drag a column header here and drop it to group by that column."},search:{aria:{selected:"Row selected",notSelected:"Row not selected"},placeholder:"Search...",showingItems:"Showing Items:",selectedItems:"Selected Items:",totalItems:"Total Items:",size:"Page Size:",first:"First Page",next:"Next Page",previous:"Previous Page",last:"Last Page"},menu:{text:"Choose Columns:"},sort:{ascending:"Sort Ascending",descending:"Sort Descending",none:"Sort None",remove:"Remove Sort"},column:{hide:"Hide Column"},aggregation:{count:"total rows: ",sum:"total: ",avg:"avg: ",min:"min: ",max:"max: "},pinning:{pinLeft:"Pin Left",pinRight:"Pin Right",unpin:"Unpin"},columnMenu:{close:"Close"},gridMenu:{aria:{buttonLabel:"Grid Menu"},columns:"Columns:",importerTitle:"Import file",exporterAllAsCsv:"Export all data as csv",exporterVisibleAsCsv:"Export visible data as csv",exporterSelectedAsCsv:"Export selected data as csv",exporterAllAsPdf:"Export all data as pdf",exporterVisibleAsPdf:"Export visible data as pdf",exporterSelectedAsPdf:"Export selected data as pdf",exporterAllAsExcel:"Export all data as excel",exporterVisibleAsExcel:"Export visible data as excel",exporterSelectedAsExcel:"Export selected data as excel",clearAllFilters:"Clear all filters"},importer:{noHeaders:"Column names were unable to be derived, does the file have a header?",noObjects:"Objects were not able to be derived, was there data in the file other than headers?",invalidCsv:"File was unable to be processed, is it valid CSV?",invalidJson:"File was unable to be processed, is it valid Json?",jsonNotArray:"Imported json file must contain an array, aborting."},pagination:{aria:{pageToFirst:"Page to first",pageBack:"Page back",pageSelected:"Selected page",pageForward:"Page forward",pageToLast:"Page to last"},sizes:"items per page",totalItems:"items",through:"through",of:"of"},grouping:{group:"Group",ungroup:"Ungroup",aggregate_count:"Agg: Count",aggregate_sum:"Agg: Sum",aggregate_max:"Agg: Max",aggregate_min:"Agg: Min",aggregate_avg:"Agg: Avg",aggregate_remove:"Agg: Remove"},validate:{error:"Error:",minLength:"Value should be at least THRESHOLD characters long.",maxLength:"Value should be at most THRESHOLD characters long.",required:"A value is needed."}}),e}])}]),angular.module("ui.grid").run(["\$templateCache",function(e){"use strict";e.put("ui-grid/ui-grid-filter",'<div class="ui-grid-filter-container" ng-style="col.extraStyle" ng-repeat="colFilter in col.filters" ng-class="{\\'ui-grid-filter-cancel-button-hidden\\' : colFilter.disableCancelFilterButton === true }"><div ng-if="colFilter.type !== \\'select\\'"><input type="text" class="ui-grid-filter-input ui-grid-filter-input-{{\$index}}" ng-model="colFilter.term" ng-attr-placeholder="{{colFilter.placeholder || \\'\\'}}" aria-label="{{colFilter.ariaLabel || aria.defaultFilterLabel}}"><div role="button" class="ui-grid-filter-button" ng-click="removeFilter(colFilter, \$index)" ng-if="!colFilter.disableCancelFilterButton" ng-disabled="colFilter.term === undefined || colFilter.term === null || colFilter.term === \\'\\'" ng-show="colFilter.term !== undefined && colFilter.term !== null && colFilter.term !== \\'\\'"><i class="ui-grid-icon-cancel" ui-grid-one-bind-aria-label="aria.removeFilter">&nbsp;</i></div></div><div ng-if="colFilter.type === \\'select\\'"><select class="ui-grid-filter-select ui-grid-filter-input-{{\$index}}" ng-model="colFilter.term" ng-show="colFilter.selectOptions.length > 0" ng-attr-placeholder="{{colFilter.placeholder || aria.defaultFilterLabel}}" aria-label="{{colFilter.ariaLabel || \\'\\'}}" ng-options="option.value as option.label for option in colFilter.selectOptions"><option value=""></option></select><div role="button" class="ui-grid-filter-button-select" ng-click="removeFilter(colFilter, \$index)" ng-if="!colFilter.disableCancelFilterButton" ng-disabled="colFilter.term === undefined || colFilter.term === null || colFilter.term === \\'\\'" ng-show="colFilter.term !== undefined && colFilter.term != null"><i class="ui-grid-icon-cancel" ui-grid-one-bind-aria-label="aria.removeFilter">&nbsp;</i></div></div></div>'),e.put("ui-grid/ui-grid-footer",'<div class="ui-grid-footer-panel ui-grid-footer-aggregates-row">\\x3c!-- tfooter --\\x3e<div class="ui-grid-footer ui-grid-footer-viewport"><div class="ui-grid-footer-canvas"><div class="ui-grid-footer-cell-wrapper" ng-style="colContainer.headerCellWrapperStyle()"><div role="row" class="ui-grid-footer-cell-row"><div ui-grid-footer-cell role="gridcell" ng-repeat="col in colContainer.renderedColumns track by col.uid" col="col" render-index="\$index" class="ui-grid-footer-cell ui-grid-clearfix"></div></div></div></div></div></div>'),e.put("ui-grid/ui-grid-grid-footer",'<div class="ui-grid-footer-info ui-grid-grid-footer"><span>{{\\'search.totalItems\\' | t}} {{grid.rows.length}}</span> <span ng-if="grid.renderContainers.body.visibleRowCache.length !== grid.rows.length" class="ngLabel">({{"search.showingItems" | t}} {{grid.renderContainers.body.visibleRowCache.length}})</span></div>'),e.put("ui-grid/ui-grid-header",'<div role="rowgroup" class="ui-grid-header">\\x3c!-- theader --\\x3e<div class="ui-grid-top-panel"><div class="ui-grid-header-viewport"><div class="ui-grid-header-canvas"><div class="ui-grid-header-cell-wrapper" ng-style="colContainer.headerCellWrapperStyle()"><div role="row" class="ui-grid-header-cell-row"><div class="ui-grid-header-cell ui-grid-clearfix" ng-repeat="col in colContainer.renderedColumns track by col.uid" ui-grid-header-cell col="col" render-index="\$index"></div></div></div></div></div></div></div>'),e.put("ui-grid/ui-grid-menu-button",'<div class="ui-grid-menu-button"><div role="button" ui-grid-one-bind-id-grid="\\'grid-menu\\'" class="ui-grid-icon-container" ng-click="toggleMenu()" aria-haspopup="true"><i class="ui-grid-icon-menu" ui-grid-one-bind-aria-label="i18n.aria.buttonLabel">&nbsp;</i></div><div ui-grid-menu menu-items="menuItems"></div></div>'),e.put("ui-grid/ui-grid-menu-header-item",'<li role="menuitem"><div class="ui-grid-menu-item" role="heading" aria-level="2" ng-show="itemShown()"><i aria-hidden="true">&nbsp; </i><span ng-bind="label()"></span></div></li>'),e.put("ui-grid/ui-grid-no-header",'<div class="ui-grid-top-panel"></div>'),e.put("ui-grid/ui-grid-row","<div ng-repeat=\\"(colRenderIndex, col) in colContainer.renderedColumns track by col.uid\\" ui-grid-one-bind-id-grid=\\"rowRenderIndex + '-' + col.uid + '-cell'\\" class=\\"ui-grid-cell\\" ng-class=\\"{ 'ui-grid-row-header-cell': col.isRowHeader }\\" role=\\"{{col.isRowHeader ? 'rowheader' : 'gridcell'}}\\" ui-grid-cell></div>"),e.put("ui-grid/ui-grid",'<div ui-i18n="en" class="ui-grid">\\x3c!-- TODO (c0bra): add "scoped" attr here, eventually? --\\x3e<style ui-grid-style>.grid{{ grid.id }} {\\n      /* Styles for the grid */\\n    }\\n\\n    .grid{{ grid.id }} .ui-grid-row, .grid{{ grid.id }} .ui-grid-cell, .grid{{ grid.id }} .ui-grid-cell .ui-grid-vertical-bar {\\n      height: {{ grid.options.rowHeight }}px;\\n    }\\n\\n    .grid{{ grid.id }} .ui-grid-row:last-child .ui-grid-cell {\\n      border-bottom-width: {{ (((grid.getVisibleRowCount() * grid.options.rowHeight) < grid.getViewportHeight()) && \\'1\\') || \\'0\\' }}px;\\n    }\\n\\n    {{ grid.verticalScrollbarStyles }}\\n    {{ grid.horizontalScrollbarStyles }}\\n\\n    /*\\n    .ui-grid[dir=rtl] .ui-grid-viewport {\\n      padding-left: {{ grid.verticalScrollbarWidth }}px;\\n    }\\n    */\\n\\n    {{ grid.customStyles }}</style><div class="ui-grid-contents-wrapper" role="grid"><div ui-grid-menu-button ng-if="grid.options.enableGridMenu"></div><div ng-if="grid.hasLeftContainer()" style="width: 0" ui-grid-pinned-container="\\'left\\'"></div><div ui-grid-render-container container-id="\\'body\\'" col-container-name="\\'body\\'" row-container-name="\\'body\\'" bind-scroll-horizontal="true" bind-scroll-vertical="true" enable-horizontal-scrollbar="grid.options.enableHorizontalScrollbar" enable-vertical-scrollbar="grid.options.enableVerticalScrollbar"></div><div ng-if="grid.hasRightContainer()" style="width: 0" ui-grid-pinned-container="\\'right\\'"></div><div ui-grid-grid-footer ng-if="grid.options.showGridFooter"></div><div ui-grid-column-menu ng-if="grid.options.enableColumnMenus"></div><div ng-transclude></div></div></div>'),e.put("ui-grid/uiGridCell",'<div class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div>'),e.put("ui-grid/uiGridColumnMenu",'<div class="ui-grid-column-menu"><div ui-grid-menu menu-items="menuItems">\\x3c!-- <div class="ui-grid-column-menu">\\n    <div class="inner" ng-show="menuShown">\\n      <ul>\\n        <div ng-show="grid.options.enableSorting">\\n          <li ng-click="sortColumn(\$event, asc)" ng-class="{ \\'selected\\' : col.sort.direction == asc }"><i class="ui-grid-icon-sort-alt-up"></i> Sort Ascending</li>\\n          <li ng-click="sortColumn(\$event, desc)" ng-class="{ \\'selected\\' : col.sort.direction == desc }"><i class="ui-grid-icon-sort-alt-down"></i> Sort Descending</li>\\n          <li ng-show="col.sort.direction" ng-click="unsortColumn()"><i class="ui-grid-icon-cancel"></i> Remove Sort</li>\\n        </div>\\n      </ul>\\n    </div>\\n  </div> --\\x3e</div></div>'),e.put("ui-grid/uiGridFooterCell",'<div class="ui-grid-cell-contents" col-index="renderIndex"><div>{{ col.getAggregationText() + ( col.getAggregationValue() CUSTOM_FILTERS ) }}</div></div>'),e.put("ui-grid/uiGridHeaderCell",'<div role="columnheader" ng-class="{ \\'sortable\\': sortable, \\'ui-grid-header-cell-last-col\\': isLastCol }" ui-grid-one-bind-aria-labelledby-grid="col.uid + \\'-header-text \\' + col.uid + \\'-sortdir-text\\'" aria-sort="{{col.sort.direction == asc ? \\'ascending\\' : ( col.sort.direction == desc ? \\'descending\\' : (!col.sort.direction ? \\'none\\' : \\'other\\'))}}"><div role="button" tabindex="0" ng-keydown="handleKeyDown(\$event)" class="ui-grid-cell-contents ui-grid-header-cell-primary-focus" col-index="renderIndex" title="TOOLTIP"><span class="ui-grid-header-cell-label" ui-grid-one-bind-id-grid="col.uid + \\'-header-text\\'">{{ col.displayName CUSTOM_FILTERS }}</span> <span ui-grid-one-bind-id-grid="col.uid + \\'-sortdir-text\\'" ui-grid-visible="col.sort.direction" aria-label="{{getSortDirectionAriaLabel()}}"><i ng-class="{ \\'ui-grid-icon-up-dir\\': col.sort.direction == asc, \\'ui-grid-icon-down-dir\\': col.sort.direction == desc, \\'ui-grid-icon-blank\\': !col.sort.direction }" title="{{isSortPriorityVisible() ? i18n.headerCell.priority + \\' \\' + ( col.sort.priority + 1 )  : null}}" aria-hidden="true"></i> <sub ui-grid-visible="isSortPriorityVisible()" class="ui-grid-sort-priority-number">{{col.sort.priority + 1}}</sub></span></div><div role="button" tabindex="0" ui-grid-one-bind-id-grid="col.uid + \\'-menu-button\\'" class="ui-grid-column-menu-button" ng-if="grid.options.enableColumnMenus && !col.isRowHeader  && col.colDef.enableColumnMenu !== false" ng-click="toggleMenu(\$event)" ng-keydown="headerCellArrowKeyDown(\$event)" ui-grid-one-bind-aria-label="i18n.headerCell.aria.columnMenuButtonLabel" aria-haspopup="true"><i class="ui-grid-icon-angle-down" aria-hidden="true">&nbsp;</i></div><div ui-grid-filter></div></div>'),e.put("ui-grid/uiGridMenu",'<div class="ui-grid-menu" ng-show="shown"><style ui-grid-style>{{dynamicStyles}}</style><div class="ui-grid-menu-mid" ng-show="shownMid"><div class="ui-grid-menu-inner" ng-if="shown"><ul role="menu" class="ui-grid-menu-items"><li ng-repeat="item in menuItems" role="menuitem" ui-grid-menu-item ui-grid-one-bind-id="\\'menuitem-\\'+\$index" action="item.action" name="item.title" active="item.active" icon="item.icon" shown="item.shown" context="item.context" template-url="item.templateUrl" leave-open="item.leaveOpen" screen-reader-only="item.screenReaderOnly"></li></ul></div></div></div>'),e.put("ui-grid/uiGridMenuItem",'<button type="button" class="ui-grid-menu-item" ng-click="itemAction(\$event, title)" ng-show="itemShown()" ng-class="{ \\'ui-grid-menu-item-active\\': active(), \\'ui-grid-sr-only\\': (!focus && screenReaderOnly) }" aria-pressed="{{active()}}" tabindex="0" ng-focus="focus=true" ng-blur="focus=false"><i ng-class="icon" aria-hidden="true">&nbsp; </i>{{ label() }}</button>'),e.put("ui-grid/uiGridRenderContainer","<div role=\\"presentation\\" ui-grid-one-bind-id-grid=\\"containerId + '-grid-container'\\" class=\\"ui-grid-render-container\\" ng-style=\\"{ 'margin-left': colContainer.getMargin('left') + 'px', 'margin-right': colContainer.getMargin('right') + 'px' }\\">\\x3c!-- All of these dom elements are replaced in place --\\x3e<div ui-grid-header></div><div ui-grid-viewport></div><div ng-if=\\"colContainer.needsHScrollbarPlaceholder()\\" class=\\"ui-grid-scrollbar-placeholder\\" ng-style=\\"{height: colContainer.grid.scrollbarHeight + 'px'}\\"></div><ui-grid-footer ng-if=\\"grid.options.showColumnFooter\\"></ui-grid-footer></div>"),e.put("ui-grid/uiGridViewport",'<div role="rowgroup" class="ui-grid-viewport" ng-style="colContainer.getViewportStyle()">\\x3c!-- tbody --\\x3e<div class="ui-grid-canvas"><div ng-repeat="(rowRenderIndex, row) in rowContainer.renderedRows track by \$index" class="ui-grid-row" ng-style="Viewport.rowStyle(rowRenderIndex)"><div role="row" ui-grid-row="row" row-render-index="rowRenderIndex"></div></div></div></div>'),e.put("ui-grid/cellEditor",'<div><form name="inputForm"><input type="INPUT_TYPE" ng-class="\\'colt\\' + col.uid" ui-grid-editor ng-model="MODEL_COL_FIELD"></form></div>'),e.put("ui-grid/dropdownEditor",'<div><form name="inputForm"><select ng-class="\\'colt\\' + col.uid" ui-grid-edit-dropdown ng-model="MODEL_COL_FIELD" ng-options="field[editDropdownIdLabel] as field[editDropdownValueLabel] CUSTOM_FILTERS for field in editDropdownOptionsArray"></select></form></div>'),e.put("ui-grid/fileChooserEditor",'<div><form name="inputForm"><input ng-class="\\'colt\\' + col.uid" ui-grid-edit-file-chooser type="file" id="files" name="files[]" ng-model="MODEL_COL_FIELD"></form></div>'),e.put("ui-grid/emptyBaseLayerContainer",'<div class="ui-grid-empty-base-layer-container ui-grid-canvas"><div class="ui-grid-row" ng-repeat="(rowRenderIndex, row) in grid.baseLayer.emptyRows track by \$index" ng-style="Viewport.rowStyle(rowRenderIndex)"><div><div><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell {{ col.getColClass(false) }}"></div></div></div></div></div>'),e.put("ui-grid/expandableRow",'<div ui-grid-expandable-row ng-if="expandableRow.shouldRenderExpand()" class="expandableRow" style="float:left; margin-top: 1px; margin-bottom: 1px" ng-style="{width: (grid.renderContainers.body.getCanvasWidth()) + \\'px\\', height: row.expandedRowHeight + \\'px\\'}"></div>'),e.put("ui-grid/expandableRowHeader",'<div class="ui-grid-row-header-cell ui-grid-expandable-buttons-cell"><div class="ui-grid-cell-contents"><i class="clickable" ng-if="!(row.groupHeader==true || row.entity.subGridOptions.disableRowExpandable)" ng-class="{ \\'ui-grid-icon-plus-squared\\' : !row.isExpanded, \\'ui-grid-icon-minus-squared\\' : row.isExpanded }" ng-click="grid.api.expandable.toggleRowExpansion(row.entity, \$event)"></i></div></div>'),e.put("ui-grid/expandableScrollFiller","<div ng-if=\\"expandableRow.shouldRenderFiller()\\" ng-class=\\"{scrollFiller: true, scrollFillerClass:(colContainer.name === 'body')}\\" ng-style=\\"{ width: (grid.getViewportWidth()) + 'px', height: row.expandedRowHeight + 2 + 'px', 'margin-left': grid.options.rowHeader.rowHeaderWidth + 'px' }\\">&nbsp;</div>"),e.put("ui-grid/expandableTopRowHeader",'<div class="ui-grid-row-header-cell ui-grid-expandable-buttons-cell"><div class="ui-grid-cell-contents"><span class="ui-grid-cell-empty" ng-if="!grid.options.showExpandAllButton"></span> <button type="button" class="ui-grid-icon-button clickable" ng-if="grid.options.showExpandAllButton" ng-class="{ \\'ui-grid-icon-plus-squared\\' : !grid.expandable.expandedAll, \\'ui-grid-icon-minus-squared\\' : grid.expandable.expandedAll }" ng-click="grid.api.expandable.toggleAllRows()"></button></div></div>'),e.put("ui-grid/csvLink",'<span class="ui-grid-exporter-csv-link-span"><a href="data:text/csv;charset=UTF-8,CSV_CONTENT" download="FILE_NAME">LINK_LABEL</a></span>'),e.put("ui-grid/importerMenuItem",'<li class="ui-grid-menu-item"><form><input class="ui-grid-importer-file-chooser" type="file" id="files" name="files[]"></form></li>'),e.put("ui-grid/importerMenuItemContainer","<div ui-grid-importer-menu-item></div>"),e.put("ui-grid/pagination",'<div class="ui-grid-pager-panel" ui-grid-pager ng-show="grid.options.enablePaginationControls"><div role="navigation" class="ui-grid-pager-container"><div class="ui-grid-pager-control"><button type="button" class="ui-grid-pager-first" ui-grid-one-bind-title="aria.pageToFirst" ui-grid-one-bind-aria-label="aria.pageToFirst" ng-click="pageFirstPageClick()" ng-disabled="cantPageBackward()"><div ng-class="grid.isRTL() ? \\'last-triangle\\' : \\'first-triangle\\'"><div ng-class="grid.isRTL() ? \\'last-bar-rtl\\' : \\'first-bar\\'"></div></div></button> <button type="button" class="ui-grid-pager-previous" ui-grid-one-bind-title="aria.pageBack" ui-grid-one-bind-aria-label="aria.pageBack" ng-click="pagePreviousPageClick()" ng-disabled="cantPageBackward()"><div ng-class="grid.isRTL() ? \\'last-triangle prev-triangle\\' : \\'first-triangle prev-triangle\\'"></div></button> <input type="number" ui-grid-one-bind-title="aria.pageSelected" ui-grid-one-bind-aria-label="aria.pageSelected" class="ui-grid-pager-control-input" ng-model="grid.options.paginationCurrentPage" min="1" max="{{ paginationApi.getTotalPages() }}" step="1" required> <span class="ui-grid-pager-max-pages-number" ng-show="paginationApi.getTotalPages() > 0"><abbr ui-grid-one-bind-title="paginationOf">/ </abbr>{{ paginationApi.getTotalPages() }} </span><button type="button" class="ui-grid-pager-next" ui-grid-one-bind-title="aria.pageForward" ui-grid-one-bind-aria-label="aria.pageForward" ng-click="pageNextPageClick()" ng-disabled="cantPageForward()"><div ng-class="grid.isRTL() ? \\'first-triangle next-triangle\\' : \\'last-triangle next-triangle\\'"></div></button> <button type="button" class="ui-grid-pager-last" ui-grid-one-bind-title="aria.pageToLast" ui-grid-one-bind-aria-label="aria.pageToLast" ng-click="pageLastPageClick()" ng-disabled="cantPageToLast()"><div ng-class="grid.isRTL() ? \\'first-triangle\\' : \\'last-triangle\\'"><div ng-class="grid.isRTL() ? \\'first-bar-rtl\\' : \\'last-bar\\'"></div></div></button></div><div class="ui-grid-pager-row-count-picker" ng-if="grid.options.paginationPageSizes.length > 1 && !grid.options.useCustomPagination"><select ui-grid-one-bind-aria-labelledby-grid="\\'items-per-page-label\\'" ng-model="grid.options.paginationPageSize" ng-options="o as o for o in grid.options.paginationPageSizes"></select><span ui-grid-one-bind-id-grid="\\'items-per-page-label\\'" class="ui-grid-pager-row-count-label">&nbsp;{{sizesLabel}}</span></div><span ng-if="grid.options.paginationPageSizes.length <= 1" class="ui-grid-pager-row-count-label">{{grid.options.paginationPageSize}}&nbsp;{{sizesLabel}}</span></div><div class="ui-grid-pager-count-container"><div class="ui-grid-pager-count"><span ng-show="grid.options.totalItems > 0">{{ 1 + paginationApi.getFirstRowIndex() }} <abbr ui-grid-one-bind-title="paginationThrough">- </abbr>{{ 1 + paginationApi.getLastRowIndex() }} {{paginationOf}} {{grid.options.totalItems}} {{totalItemsLabel}}</span></div></div></div>'),e.put("ui-grid/columnResizer",'<div ui-grid-column-resizer ng-if="grid.options.enableColumnResizing" class="ui-grid-column-resizer" col="col" position="right" render-index="renderIndex" unselectable="on"></div>'),e.put("ui-grid/gridFooterSelectedItems",'<span ng-if="grid.selection.selectedCount !== 0 && grid.options.enableFooterTotalSelected">({{"search.selectedItems" | t}} {{grid.selection.selectedCount}})</span>'),e.put("ui-grid/selectionHeaderCell",'<div>\\x3c!-- <div class="ui-grid-vertical-bar">&nbsp;</div> --\\x3e<div class="ui-grid-cell-contents" col-index="renderIndex"><ui-grid-selection-select-all-buttons ng-if="grid.options.enableSelectAll" role="checkbox" ng-model="grid.selection.selectAll"></ui-grid-selection-select-all-buttons></div></div>'),e.put("ui-grid/selectionRowHeader",'<div class="ui-grid-cell-contents ui-grid-disable-selection clickable"><ui-grid-selection-row-header-buttons></ui-grid-selection-row-header-buttons></div>'),e.put("ui-grid/selectionRowHeaderButtons",'<div class="ui-grid-selection-row-header-buttons ui-grid-icon-ok clickable" ng-class="{\\'ui-grid-row-selected\\': row.isSelected}" ng-click="selectButtonClick(row, \$event)" ng-keydown="selectButtonKeyDown(row, \$event)" role="checkbox" ng-model="row.isSelected">&nbsp;</div>'),e.put("ui-grid/selectionSelectAllButtons",'<div role="button" class="ui-grid-selection-row-header-buttons ui-grid-icon-ok" ng-class="{\\'ui-grid-all-selected\\': grid.selection.selectAll}" ng-click="headerButtonClick(\$event)" ng-keydown="headerButtonKeyDown(\$event)"></div>'),e.put("ui-grid/treeBaseExpandAllButtons",'<div class="ui-grid-tree-base-row-header-buttons" ng-class="headerButtonClass()" ng-click="headerButtonClick(\$event)"></div>'),e.put("ui-grid/treeBaseHeaderCell",'<div><div class="ui-grid-cell-contents" col-index="renderIndex"><ui-grid-tree-base-expand-all-buttons ng-if="grid.options.enableExpandAll"></ui-grid-tree-base-expand-all-buttons></div></div>'),e.put("ui-grid/treeBaseRowHeader",'<div class="ui-grid-cell-contents"><ui-grid-tree-base-row-header-buttons></ui-grid-tree-base-row-header-buttons></div>'),e.put("ui-grid/treeBaseRowHeaderButtons",'<div class="ui-grid-tree-base-row-header-buttons" ng-class="{\\'ui-grid-tree-base-header\\': row.treeLevel > -1 }" ng-click="treeButtonClick(row, \$event)"><i ng-class="treeButtonClass(row)" ng-style="{\\'padding-left\\': grid.options.treeIndent * row.treeLevel + \\'px\\'}"></i> &nbsp;</div>'),e.put("ui-grid/cellTitleValidator",'<div class="ui-grid-cell-contents" ng-class="{invalid:grid.validate.isInvalid(row.entity,col.colDef)}" title="{{grid.validate.getTitleFormattedErrors(row.entity,col.colDef)}}">{{COL_FIELD CUSTOM_FILTERS}}</div>'),e.put("ui-grid/cellTooltipValidator",'<div class="ui-grid-cell-contents" ng-class="{invalid:grid.validate.isInvalid(row.entity,col.colDef)}" tooltip-html-unsafe="{{grid.validate.getFormattedErrors(row.entity,col.colDef)}}" tooltip-enable="grid.validate.isInvalid(row.entity,col.colDef)" tooltip-append-to-body="true" tooltip-placement="top" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div>')}]);
/*!
 * ui-grid - v4.6.5 - 2018-11-16
 * Copyright (c) 2018 ; License: MIT 
 */


!function(){"use strict";angular.module("ui.grid.autoResize",["ui.grid"]).directive("uiGridAutoResize",["gridUtil",function(n){return{require:"uiGrid",scope:!1,link:function(i,r,e,u){var t;t=n.debounce(function(i,e,t,n){null!==r[0].offsetParent&&(u.grid.gridWidth=t,u.grid.gridHeight=n,u.grid.queueGridRefresh().then(function(){u.grid.api.core.raise.gridDimensionChanged(e,i,n,t)}))},400),i.\$watchCollection(function(){return{width:n.elementWidth(r),height:n.elementHeight(r)}},function(i,e){angular.equals(i,e)||t(e.width,e.height,i.width,i.height)})}}}])}();
/*!
 * ui-grid - v4.6.6 - 2018-11-16
 * Copyright (c) 2018 ; License: MIT 
 */


!function(){"use strict";var e=angular.module("ui.grid.resizeColumns",["ui.grid"]);e.service("uiGridResizeColumnsService",["gridUtil","\$q","\$rootScope",function(t,o,r){return{defaultGridOptions:function(e){e.enableColumnResizing=!1!==e.enableColumnResizing,!1===e.enableColumnResize&&(e.enableColumnResizing=!1)},colResizerColumnBuilder:function(e,i,n){return e.enableColumnResizing=void 0===e.enableColumnResizing?n.enableColumnResizing:e.enableColumnResizing,!1===e.enableColumnResize&&(e.enableColumnResizing=!1),o.all([])},registerPublicApi:function(e){e.api.registerEventsFromObject({colResizable:{columnSizeChanged:function(e,i){}}})},fireColumnSizeChanged:function(e,i,n){r.\$applyAsync(function(){e.api.colResizable?e.api.colResizable.raise.columnSizeChanged(i,n):t.logError("The resizeable api is not registered, this may indicate that you've included the module but not added the 'ui-grid-resize-columns' directive to your grid definition.  Cannot raise any events.")})},findTargetCol:function(e,i,n){var t=e.getRenderContainer();if("left"===i){var o=t.visibleColumnCache.indexOf(e);return t.visibleColumnCache[o-1*n]}return e}}}]),e.directive("uiGridResizeColumns",["gridUtil","uiGridResizeColumnsService",function(e,o){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(e,i,n,t){o.defaultGridOptions(t.grid.options),t.grid.registerColumnBuilder(o.colResizerColumnBuilder),o.registerPublicApi(t.grid)},post:function(e,i,n,t){}}}}}]),e.directive("uiGridHeaderCell",["gridUtil","\$templateCache","\$compile","\$q","uiGridResizeColumnsService","uiGridConstants",function(e,r,d,i,c,g){return{priority:-10,require:"^uiGrid",compile:function(){return{post:function(l,a,e,i){var n=i.grid;if(n.options.enableColumnResizing){var u=r.get("ui-grid/columnResizer"),s=1;n.isRTL()&&(l.position="left",s=-1);var t=function(){for(var e=a[0].getElementsByClassName("ui-grid-column-resizer"),i=0;i<e.length;i++)angular.element(e[i]).remove();var n=c.findTargetCol(l.col,"left",s),t=l.col.getRenderContainer();if(n&&0!==t.visibleColumnCache.indexOf(l.col)&&!1!==n.colDef.enableColumnResizing){var o=angular.element(u).clone();o.attr("position","left"),a.prepend(o),d(o)(l)}if(!1!==l.col.colDef.enableColumnResizing){var r=angular.element(u).clone();r.attr("position","right"),a.append(r),d(r)(l)}};t();var o=n.registerDataChangeCallback(function(){l.\$applyAsync(t)},[g.dataChange.COLUMN]);l.\$on("\$destroy",o)}}}}}}]),e.directive("uiGridColumnResizer",["\$document","gridUtil","uiGridConstants","uiGridResizeColumnsService",function(v,h,p,z){var R=angular.element('<div class="ui-grid-resize-overlay"></div>');return{priority:0,scope:{col:"=",position:"@",renderIndex:"="},require:"?^uiGrid",link:function(a,u,e,s){var r=0,l=0,d=0,c=1;function g(e){s.grid.refreshCanvas(!0).then(function(){s.grid.queueGridRefresh()})}function f(e,i){var n=i;return e.minWidth&&n<e.minWidth?n=e.minWidth:e.maxWidth&&n>e.maxWidth&&(n=e.maxWidth),n}function n(e,i){e.originalEvent&&(e=e.originalEvent),e.preventDefault(),(l=(e.targetTouches?e.targetTouches[0]:e).clientX-d)<0?l=0:l>s.grid.gridWidth&&(l=s.grid.gridWidth);var n=z.findTargetCol(a.col,a.position,c);if(!1!==n.colDef.enableColumnResizing){s.grid.element.hasClass("column-resizing")||s.grid.element.addClass("column-resizing");var t=l-r,o=parseInt(n.drawnWidth+t*c,10);l+=(f(n,o)-o)*c,R.css({left:l+"px"}),s.fireEvent(p.events.ITEM_DRAGGING)}}function t(e){e.originalEvent&&(e=e.originalEvent),e.preventDefault(),s.grid.element.removeClass("column-resizing"),R.remove();var i=(l=(e.changedTouches?e.changedTouches[0]:e).clientX-d)-r;if(0===i)return C(),void m();var n=z.findTargetCol(a.col,a.position,c);if(!1!==n.colDef.enableColumnResizing){var t=parseInt(n.drawnWidth+i*c,10);n.width=f(n,t),n.hasCustomWidth=!0,g(),z.fireColumnSizeChanged(s.grid,n.colDef,i),C(),m()}}s.grid.isRTL()&&(a.position="left",c=-1),"left"===a.position?u.addClass("left"):"right"===a.position&&u.addClass("right");var o=function(e,i){e.originalEvent&&(e=e.originalEvent),e.stopPropagation(),d=s.grid.element[0].getBoundingClientRect().left,r=(e.targetTouches?e.targetTouches[0]:e).clientX-d,s.grid.element.append(R),R.css({left:r}),"touchstart"===e.type?(v.on("touchend",t),v.on("touchmove",n),u.off("mousedown",o)):(v.on("mouseup",t),v.on("mousemove",n),u.off("touchstart",o))},m=function(){u.on("mousedown",o),u.on("touchstart",o)},C=function(){v.off("mouseup",t),v.off("touchend",t),v.off("mousemove",n),v.off("touchmove",n),u.off("mousedown",o),u.off("touchstart",o)};m();var i=function(e,i){e.stopPropagation();var n=z.findTargetCol(a.col,a.position,c);if(!1!==n.colDef.enableColumnResizing){var o=0,t=h.closestElm(u,".ui-grid-render-container").querySelectorAll("."+p.COL_CLASS_PREFIX+n.uid+" .ui-grid-cell-contents");Array.prototype.forEach.call(t,function(e){var t;angular.element(e).parent().hasClass("ui-grid-header-cell")&&(t=angular.element(e).parent()[0].querySelectorAll(".ui-grid-column-menu-button")),h.fakeElement(e,{},function(e){var i=angular.element(e);i.attr("style","float: left");var n=h.elementWidth(i);t&&(n+=h.elementWidth(t));o<n&&(o=n)})});var r=f(n,o),l=r-n.drawnWidth;n.width=r,n.hasCustomWidth=!0,g(),z.fireColumnSizeChanged(s.grid,n.colDef,l)}};u.on("dblclick",i),u.on("\$destroy",function(){u.off("dblclick",i),C()})}}}])}();
`;

var uims = `

// angular ui.multiselect from http://embed.plnkr.co/xWvfWYjaW7TThKZONkv5/
angular.module('ui.multiselect', [])

  //from bootstrap-ui typeahead parser
  .factory('optionParser', ['\$parse', function (\$parse) {

    //                      00000111000000000000022200000000000000003333333333333330000000000044000
    var TYPEAHEAD_REGEXP = /^\\s*(.*?)(?:\\s+as\\s+(.*?))?\\s+for\\s+(?:([\\\$\\w][\\\$\\w\\d]*))\\s+in\\s+(.*)\$/;

    return {
      parse: function (input) {

        var match = input.match(TYPEAHEAD_REGEXP), modelMapper, viewMapper, source;
        if (!match) {
          throw new Error(
            "Expected typeahead specification in form of '_modelValue_ (as _label_)? for _item_ in _collection_'" +
              " but got '" + input + "'.");
        }

        return {
          itemName: match[3],
          source: \$parse(match[4]),
          viewMapper: \$parse(match[2] || match[1]),
          modelMapper: \$parse(match[1])
        };
      }
    };
  }])

  .directive('multiselect', ['\$parse', '\$document', '\$compile', 'optionParser',

    function (\$parse, \$document, \$compile, optionParser) {
      return {
        restrict: 'E',
        require: 'ngModel',
        link: function (originalScope, element, attrs, modelCtrl) {

          var exp = attrs.options,
            parsedResult = optionParser.parse(exp),
            isMultiple = attrs.multiple ? true : false,
			
            required = false,
            scope = originalScope.\$new(),
            changeHandler = attrs.change || angular.noop;

          scope.items = [];
          scope.header = \$parse(attrs.header)(originalScope);
          scope.multiple = isMultiple;
		  scope.noAllLinks = !!attrs.noAllLinks;
		  scope.noFilter = !!attrs.noFilter;
		  scope.noMode = !!attrs.noMode;
          scope.disabled = false;
		  scope.mode = {not:false, and:false},
		  scope.element = element;

          originalScope.\$on('\$destroy', function () {
            scope.\$destroy();
          });

          var popUpEl = angular.element('<multiselect-popup></multiselect-popup>');

          //required validator
          if (attrs.required || attrs.ngRequired) {
            required = true;
          }
          attrs.\$observe('required', function(newVal) {
            required = newVal;
          });

          //watch disabled state
          scope.\$watch(function () {
            return \$parse(attrs.disabled)(originalScope);
          }, function (newVal) {
            scope.disabled = newVal;
          });

          //watch single/multiple state for dynamically change single to multiple
          scope.\$watch(function () {
            return \$parse(attrs.multiple)(originalScope);
          }, function (newVal) {
            isMultiple = newVal || false;
          });

          //watch option changes for options that are populated dynamically
          scope.\$watch(function () {
            return parsedResult.source(originalScope);
          }, function (newVal) {
            if (angular.isDefined(newVal))
              parseModel();
          });

          //watch model change
          scope.\$watch(function () {
            return modelCtrl.\$modelValue;
          }, function (newVal, oldVal) {
            //when directive initialize, newVal usually undefined. Also, if model value already set in the controller
            //for preselected list then we need to mark checked in our scope item. But we don't want to do this every time
            //model changes. We need to do this only if it is done outside directive scope, from controller, for example.
            if (angular.isDefined(newVal)) {
              markChecked(!isMultiple ? newVal : newVal ? newVal.options : newVal);
			  if(isMultiple && newVal && newVal.mode)
				{
				  scope.mode.and = newVal.mode.and;
				}
              scope.\$eval(changeHandler);
            }
            getHeaderText();
            modelCtrl.\$setValidity('required', scope.valid());
          }, true);

          //watch mode
          scope.\$watch('mode.and', function (newVal) {
			setModelValue(true);
          });

          function parseModel() {
            scope.items.length = 0;
            var model = parsedResult.source(originalScope);
			for (var i = 0; i < model.length; i++) {
			  var local = {};
			  local[parsedResult.itemName] = model[i];
			  scope.items.push({
				label: parsedResult.viewMapper(local),
				model: model[i],
				checked: false
			  });
			}
          }

          parseModel();

          element.append(\$compile(popUpEl)(scope));

          function getHeaderText() {
              scope.header = \$parse(attrs.header)(originalScope);
          }

          scope.valid = function validModel() {
            if(!required) return true;
            var value = modelCtrl.\$modelValue;
            return (angular.isArray(value) && value.length > 0) || (!angular.isArray(value) && value != null);
          };

          function selectSingle(item) {
            if (item.checked) {
              scope.uncheckAll();
            } else {
              scope.uncheckAll();
              item.checked = !item.checked;
            }
            setModelValue(false);
          }

          function selectMultiple(item) {
            item.checked = !item.checked;
            setModelValue(true);
          }

          function setModelValue(isMultiple) {
            var value;

            if (isMultiple) {
              value = [];
              angular.forEach(scope.items, function (item) {
                if (item.checked) value.push(item.model);
              });
			  value = {options:value,mode:{and:scope.mode.and}};
            } else {
              angular.forEach(scope.items, function (item) {
                if (item.checked) {
                  value = item.model;
                  return false;
                }
              })
            }
            modelCtrl.\$setViewValue(value);
          }

          function markChecked(newVal) {
			  angular.forEach(scope.items, i=>i.checked = false);
			  if(!newVal)
				  return;
            if (!angular.isArray(newVal)) {
              angular.forEach(scope.items, function (item) {
                if (angular.equals(item.model, newVal)) {
                  item.checked = true;
                  return false;
                }
              });
            } else {
              angular.forEach(newVal, function (i) {
                angular.forEach(scope.items, function (item) {
                  if (angular.equals(item.model, i)) {
                    item.checked = true;
                  }
                });
              });
            }
          }

          scope.checkAll = function () {
            if (!isMultiple) return;
            angular.forEach(scope.items, function (item) {
              item.checked = true;
            });
            setModelValue(true);
          };

          scope.uncheckAll = function () {
            angular.forEach(scope.items, function (item) {
              item.checked = false;
            });
            setModelValue(true);
          };

          scope.select = function (item) {
            if (isMultiple === false) {
              selectSingle(item);
              scope.toggleSelect();
            } else {
              selectMultiple(item);
            }
          }
        }
      };
    }])

  .directive('multiselectPopup', ['\$document', function (\$document) {
    return {
      restrict: 'E',
      scope: false,
      replace: true,
      template: 
\`<div class="ui-ms-dropdown">
  <button class="ui-ms-btn" ng-click="toggleSelect()" ng-disabled="disabled" ng-class="{'error': !valid()}">
    <span class="ui-ms-pull-left">{{header}}</span>
    <span class="ui-ms-caret ui-ms-pull-right"></span>
  </button>
  <ul class="ui-ms-dropdown-menu">
    <li ng-if="!noFilter">
      <input class="ui-ms-input-block-level" type="text" ng-model="\$parent.searchText.label" autofocus="autofocus" placeholder="Filter" />
    </li>
    <li ng-show="multiple" ng-if="!noAllLinks || !noMode">
	  <div ng-if="!noAllLinks">
	      <button class="ui-ms-btn-link ui-ms-btn-small" ng-click="checkAll()"><i class="ui-ms-icon-ok"></i> Check all</button>
	      <button class="ui-ms-btn-link ui-ms-btn-small" ng-click="uncheckAll()"><i class="ui-ms-icon-remove"></i> Uncheck all</button>
	  </div>
	  <div ng-if="!noMode" class="modes">
		  <button class="ui-ms-btn-mode" ng-class="{on: !mode.and}" ng-click="mode.and = false">OR</button>
		  <button class="ui-ms-btn-mode" ng-class="{on: mode.and}" ng-click="mode.and = true">AND</button>
	  </div>
    </li>
	<ul class="ui-ms-options-list">
		<li ng-repeat="i in items | filter:searchText">
		  <a ng-click="select(i); focus()">
			<i ng-class="{'ui-ms-icon-ok': i.checked, 'ui-ms-icon-empty': !i.checked}"></i>{{i.label}}</a>
		</li>
	</ul>
  </ul>
</div>\`,
      link: function (scope, element, attrs) {

        scope.isVisible = false;

  var mouseWheeltoBind = ( 'onwheel' in document || document.documentMode >= 9 ) ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'];

    for ( var i = mouseWheeltoBind.length; i; ) {
      element.find('ul').on(mouseWheeltoBind[--i], function(e) { e.stopPropagation(); });
    }

        scope.toggleSelect = function () {
          if (element.hasClass('open')) {
            element.removeClass('open');
            \$document.unbind('click', clickHandler);
          } else {
            element.addClass('open');
            scope.focus();
            \$document.bind('click', clickHandler);
          }
        };

        function clickHandler(event) {
          if (elementMatchesAnyInArray(event.target, element.find(event.target.tagName)))
            return;
          element.removeClass('open');
          \$document.unbind('click', clickHandler);
          scope.\$digest();
        }
        
        scope.focus = function focus(){
			if(this.noFilter)
				return;
          var searchBox = element.find('input')[0];
          searchBox.focus(); 
        }

        var elementMatchesAnyInArray = function (element, elementArray) {
          for (var i = 0; i < elementArray.length; i++)
            if (element == elementArray[i])
              return true;
          return false;
        }
      }
    }
  }]);

`;

var uigridcss = `
/*!
 * ui-grid - v4.6.6 - 2018-11-16
 * Copyright (c) 2018 ; License: MIT 
 */.ui-grid{border:1px solid #d4d4d4;box-sizing:content-box;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;-webkit-transform:translateZ(0);-moz-transform:translateZ(0);-o-transform:translateZ(0);-ms-transform:translateZ(0);transform:translateZ(0)}.ui-grid-vertical-bar{position:absolute;right:0;width:0}.ui-grid-header-cell:not(:last-child) .ui-grid-vertical-bar,.ui-grid-cell:not(:last-child) .ui-grid-vertical-bar{width:1px}.ui-grid-scrollbar-placeholder{background-color:transparent}.ui-grid-header-cell:not(:last-child) .ui-grid-vertical-bar{background-color:#d4d4d4}.ui-grid-cell:not(:last-child) .ui-grid-vertical-bar{background-color:#d4d4d4}.ui-grid-header-cell:last-child .ui-grid-vertical-bar{right:-1px;width:1px;background-color:#d4d4d4}.ui-grid-clearfix:before,.ui-grid-clearfix:after{content:"";display:table}.ui-grid-clearfix:after{clear:both}.ui-grid-invisible{visibility:hidden}.ui-grid-contents-wrapper{position:relative;height:100%;width:100%}.ui-grid-sr-only{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}.ui-grid-icon-button{background-color:transparent;border:none;padding:0}.clickable{cursor:pointer}.ui-grid-top-panel-background{background-color:#f3f3f3}.ui-grid-header{border-bottom:1px solid #d4d4d4;box-sizing:border-box}.ui-grid-top-panel{position:relative;overflow:hidden;font-weight:bold;background-color:#f3f3f3;-webkit-border-top-right-radius:-1px;-webkit-border-bottom-right-radius:0;-webkit-border-bottom-left-radius:0;-webkit-border-top-left-radius:-1px;-moz-border-radius-topright:-1px;-moz-border-radius-bottomright:0;-moz-border-radius-bottomleft:0;-moz-border-radius-topleft:-1px;border-top-right-radius:-1px;border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-left-radius:-1px;-moz-background-clip:padding-box;-webkit-background-clip:padding-box;background-clip:padding-box}.ui-grid-header-viewport{overflow:hidden}.ui-grid-header-canvas:before,.ui-grid-header-canvas:after{content:"";display:-ms-flexbox;display:flex;line-height:0}.ui-grid-header-canvas:after{clear:both}.ui-grid-header-cell-wrapper{position:relative;display:-ms-flexbox;display:flex;box-sizing:border-box;height:100%;width:100%}.ui-grid-header-cell-row{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap}.ui-grid-header-cell{position:relative;box-sizing:border-box;background-color:inherit;border-right:1px solid;border-color:#d4d4d4;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:0}.ui-grid-header-cell:last-child{border-right:0}.ui-grid-header-cell .sortable{cursor:pointer}.ui-grid-header-cell .ui-grid-sort-priority-number{margin-left:-8px}.ui-grid-header-cell>div{-ms-flex-basis:100%;flex-basis:100%}.ui-grid-header .ui-grid-vertical-bar{top:0;bottom:0}.ui-grid-column-menu-button{position:absolute;right:1px;top:0}.ui-grid-column-menu-button .ui-grid-icon-angle-down{vertical-align:sub}.ui-grid-header-cell-last-col .ui-grid-cell-contents,.ui-grid-header-cell-last-col .ui-grid-filter-container,.ui-grid-header-cell-last-col .ui-grid-column-menu-button,.ui-grid-header-cell-last-col+.ui-grid-column-resizer.right{margin-right:13px}.ui-grid-render-container-right .ui-grid-header-cell-last-col .ui-grid-cell-contents,.ui-grid-render-container-right .ui-grid-header-cell-last-col .ui-grid-filter-container,.ui-grid-render-container-right .ui-grid-header-cell-last-col .ui-grid-column-menu-button,.ui-grid-render-container-right .ui-grid-header-cell-last-col+.ui-grid-column-resizer.right{margin-right:28px}.ui-grid-column-menu{position:absolute}.ui-grid-column-menu .ui-grid-menu .ui-grid-menu-mid.ng-hide-add,.ui-grid-column-menu .ui-grid-menu .ui-grid-menu-mid.ng-hide-remove{-webkit-transition:all .04s linear;-moz-transition:all .04s linear;-o-transition:all .04s linear;transition:all .04s linear;display:block !important}.ui-grid-column-menu .ui-grid-menu .ui-grid-menu-mid.ng-hide-add.ng-hide-add-active,.ui-grid-column-menu .ui-grid-menu .ui-grid-menu-mid.ng-hide-remove{-webkit-transform:translateY(-100%);-moz-transform:translateY(-100%);-o-transform:translateY(-100%);-ms-transform:translateY(-100%);transform:translateY(-100%)}.ui-grid-column-menu .ui-grid-menu .ui-grid-menu-mid.ng-hide-add,.ui-grid-column-menu .ui-grid-menu .ui-grid-menu-mid.ng-hide-remove.ng-hide-remove-active{-webkit-transform:translateY(0);-moz-transform:translateY(0);-o-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0)}.ui-grid-menu-button .ui-grid-menu .ui-grid-menu-mid.ng-hide-add,.ui-grid-menu-button .ui-grid-menu .ui-grid-menu-mid.ng-hide-remove{-webkit-transition:all .04s linear;-moz-transition:all .04s linear;-o-transition:all .04s linear;transition:all .04s linear;display:block !important}.ui-grid-menu-button .ui-grid-menu .ui-grid-menu-mid.ng-hide-add.ng-hide-add-active,.ui-grid-menu-button .ui-grid-menu .ui-grid-menu-mid.ng-hide-remove{-webkit-transform:translateY(-100%);-moz-transform:translateY(-100%);-o-transform:translateY(-100%);-ms-transform:translateY(-100%);transform:translateY(-100%)}.ui-grid-menu-button .ui-grid-menu .ui-grid-menu-mid.ng-hide-add,.ui-grid-menu-button .ui-grid-menu .ui-grid-menu-mid.ng-hide-remove.ng-hide-remove-active{-webkit-transform:translateY(0);-moz-transform:translateY(0);-o-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0)}.ui-grid-filter-container{padding:4px 10px;position:relative}.ui-grid-filter-container .ui-grid-filter-button{position:absolute;top:0;bottom:0;right:0}.ui-grid-filter-container .ui-grid-filter-button [class^="ui-grid-icon"]{position:absolute;top:50%;line-height:32px;margin-top:-16px;right:10px;opacity:.66}.ui-grid-filter-container .ui-grid-filter-button [class^="ui-grid-icon"]:hover{opacity:1}.ui-grid-filter-container .ui-grid-filter-button-select{position:absolute;top:0;bottom:0;right:0}.ui-grid-filter-container .ui-grid-filter-button-select [class^="ui-grid-icon"]{position:absolute;top:50%;line-height:32px;margin-top:-16px;right:0px;opacity:.66}.ui-grid-filter-container .ui-grid-filter-button-select [class^="ui-grid-icon"]:hover{opacity:1}input[type="text"].ui-grid-filter-input{box-sizing:border-box;padding:0 18px 0 0;margin:0;width:100%;border:1px solid #d4d4d4;-webkit-border-top-right-radius:0;-webkit-border-bottom-right-radius:0;-webkit-border-bottom-left-radius:0;-webkit-border-top-left-radius:0;-moz-border-radius-topright:0;-moz-border-radius-bottomright:0;-moz-border-radius-bottomleft:0;-moz-border-radius-topleft:0;border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-left-radius:0;-moz-background-clip:padding-box;-webkit-background-clip:padding-box;background-clip:padding-box}input[type="text"].ui-grid-filter-input:hover{border:1px solid #d4d4d4}select.ui-grid-filter-select{padding:0;margin:0;border:0;width:90%;border:1px solid #d4d4d4;-webkit-border-top-right-radius:0;-webkit-border-bottom-right-radius:0;-webkit-border-bottom-left-radius:0;-webkit-border-top-left-radius:0;-moz-border-radius-topright:0;-moz-border-radius-bottomright:0;-moz-border-radius-bottomleft:0;-moz-border-radius-topleft:0;border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-left-radius:0;-moz-background-clip:padding-box;-webkit-background-clip:padding-box;background-clip:padding-box}select.ui-grid-filter-select:hover{border:1px solid #d4d4d4}.ui-grid-filter-cancel-button-hidden select.ui-grid-filter-select{width:100%}.ui-grid-render-container{position:inherit;-webkit-border-top-right-radius:0;-webkit-border-bottom-right-radius:0;-webkit-border-bottom-left-radius:0;-webkit-border-top-left-radius:0;-moz-border-radius-topright:0;-moz-border-radius-bottomright:0;-moz-border-radius-bottomleft:0;-moz-border-radius-topleft:0;border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-left-radius:0;-moz-background-clip:padding-box;-webkit-background-clip:padding-box;background-clip:padding-box}.ui-grid-render-container:focus{outline:none}.ui-grid-viewport{min-height:20px;position:relative;overflow-y:scroll;-webkit-overflow-scrolling:touch}.ui-grid-viewport:focus{outline:none !important}.ui-grid-canvas{position:relative;padding-top:1px}.ui-grid-row{clear:both}.ui-grid-row:nth-child(odd) .ui-grid-cell{background-color:#fdfdfd}.ui-grid-row:nth-child(even) .ui-grid-cell{background-color:#f3f3f3}.ui-grid-row:last-child .ui-grid-cell{border-bottom-color:#d4d4d4;border-bottom-style:solid}.ui-grid-row:hover>[ui-grid-row]>.ui-grid-cell:hover .ui-grid-cell,.ui-grid-row:nth-child(odd):hover .ui-grid-cell,.ui-grid-row:nth-child(even):hover .ui-grid-cell{background-color:#d5eaee}.ui-grid-no-row-overlay{position:absolute;top:0;bottom:0;left:0;right:0;margin:10%;background-color:#f3f3f3;-webkit-border-top-right-radius:0;-webkit-border-bottom-right-radius:0;-webkit-border-bottom-left-radius:0;-webkit-border-top-left-radius:0;-moz-border-radius-topright:0;-moz-border-radius-bottomright:0;-moz-border-radius-bottomleft:0;-moz-border-radius-topleft:0;border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-left-radius:0;-moz-background-clip:padding-box;-webkit-background-clip:padding-box;background-clip:padding-box;border:1px solid #d4d4d4;font-size:2em;text-align:center}.ui-grid-no-row-overlay>*{position:absolute;display:table;margin:auto 0;width:100%;top:0;bottom:0;left:0;right:0;opacity:.66}.ui-grid-cell{overflow:hidden;float:left;background-color:inherit;border-right:1px solid;border-color:#d4d4d4;box-sizing:border-box}.ui-grid-cell:last-child{border-right:0}.ui-grid-cell-contents{padding:5px;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;white-space:nowrap;-ms-text-overflow:ellipsis;-o-text-overflow:ellipsis;text-overflow:ellipsis;overflow:hidden;height:100%}.ui-grid-cell-contents-hidden{visibility:hidden;width:0;height:0;display:none}.ui-grid-row .ui-grid-cell.ui-grid-row-header-cell{background-color:#F0F0EE;border-bottom:solid 1px #d4d4d4}.ui-grid-cell-empty{display:inline-block;width:10px;height:10px}.ui-grid-footer-info{padding:5px 10px}.ui-grid-footer-panel-background{background-color:#f3f3f3}.ui-grid-footer-panel{position:relative;border-bottom:1px solid #d4d4d4;border-top:1px solid #d4d4d4;overflow:hidden;font-weight:bold;background-color:#f3f3f3;-webkit-border-top-right-radius:-1px;-webkit-border-bottom-right-radius:0;-webkit-border-bottom-left-radius:0;-webkit-border-top-left-radius:-1px;-moz-border-radius-topright:-1px;-moz-border-radius-bottomright:0;-moz-border-radius-bottomleft:0;-moz-border-radius-topleft:-1px;border-top-right-radius:-1px;border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-left-radius:-1px;-moz-background-clip:padding-box;-webkit-background-clip:padding-box;background-clip:padding-box}.ui-grid-grid-footer{float:left;width:100%}.ui-grid-footer-viewport,.ui-grid-footer-canvas{display:flex;flex:1 1 auto;height:100%}.ui-grid-footer-viewport{overflow:hidden}.ui-grid-footer-canvas{position:relative}.ui-grid-footer-canvas:before,.ui-grid-footer-canvas:after{content:"";display:table;line-height:0}.ui-grid-footer-canvas:after{clear:both}.ui-grid-footer-cell-wrapper{position:relative;display:table;box-sizing:border-box;height:100%}.ui-grid-footer-cell-row{display:table-row}.ui-grid-footer-cell{overflow:hidden;background-color:inherit;border-right:1px solid;border-color:#d4d4d4;box-sizing:border-box;display:table-cell}.ui-grid-footer-cell:last-child{border-right:0}.ui-grid-menu-button{z-index:2;position:absolute;right:0;top:0;background:#f3f3f3;border:0;border-left:1px solid #d4d4d4;border-bottom:1px solid #d4d4d4;cursor:pointer;height:32px;font-weight:normal}.ui-grid-menu-button .ui-grid-icon-container{margin-top:5px;margin-left:2px}.ui-grid-menu-button .ui-grid-menu{right:0}.ui-grid-menu-button .ui-grid-menu .ui-grid-menu-mid{overflow:scroll}.ui-grid-menu{overflow:hidden;max-width:320px;z-index:2;position:absolute;right:100%;padding:0 10px 20px 10px;cursor:pointer;box-sizing:border-box}.ui-grid-menu-item{width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ui-grid-menu .ui-grid-menu-inner{background:#fff;border:1px solid #d4d4d4;position:relative;white-space:nowrap;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.ui-grid-menu .ui-grid-menu-inner ul{margin:0;padding:0;list-style-type:none}.ui-grid-menu .ui-grid-menu-inner ul li{padding:0}.ui-grid-menu .ui-grid-menu-inner ul li .ui-grid-menu-item{color:#000;min-width:100%;padding:8px;text-align:left;background:transparent;border:none;cursor:default}.ui-grid-menu .ui-grid-menu-inner ul li button.ui-grid-menu-item{cursor:pointer}.ui-grid-menu .ui-grid-menu-inner ul li button.ui-grid-menu-item:hover,.ui-grid-menu .ui-grid-menu-inner ul li button.ui-grid-menu-item:focus{background-color:#b3c4c7}.ui-grid-menu .ui-grid-menu-inner ul li button.ui-grid-menu-item.ui-grid-menu-item-active{background-color:#9cb2b6}.ui-grid-menu .ui-grid-menu-inner ul li:not(:last-child)>.ui-grid-menu-item{border-bottom:1px solid #d4d4d4}.ui-grid-sortarrow{right:5px;position:absolute;width:20px;top:0;bottom:0;background-position:center}.ui-grid-sortarrow.down{-webkit-transform:rotate(180deg);-moz-transform:rotate(180deg);-o-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}@font-face{font-family:'ui-grid';src:url('fonts/ui-grid.eot');src:url('fonts/ui-grid.eot#iefix') format('embedded-opentype'),url('fonts/ui-grid.woff') format('woff'),url('fonts/ui-grid.ttf') format('truetype'),url('fonts/ui-grid.svg?#ui-grid') format('svg');font-weight:normal;font-style:normal}[class^="ui-grid-icon"]:before,[class*=" ui-grid-icon"]:before{font-family:"ui-grid";font-style:normal;font-weight:normal;speak:none;display:inline-block;text-decoration:inherit;width:1em;margin-right:.2em;text-align:center;font-variant:normal;text-transform:none;line-height:1em;margin-left:.2em}.ui-grid-icon-blank::before{width:1em;content:' '}.ui-grid-icon-plus-squared:before{content:'\\c350'}.ui-grid-icon-minus-squared:before{content:'\\c351'}.ui-grid-icon-search:before{content:'\\c352'}.ui-grid-icon-cancel:before{content:'\\c353'}.ui-grid-icon-info-circled:before{content:'\\c354'}.ui-grid-icon-lock:before{content:'\\c355'}.ui-grid-icon-lock-open:before{content:'\\c356'}.ui-grid-icon-pencil:before{content:'\\c357'}.ui-grid-icon-down-dir:before{content:'\\c358'}.ui-grid-icon-up-dir:before{content:'\\c359'}.ui-grid-icon-left-dir:before{content:'\\c35a'}.ui-grid-icon-right-dir:before{content:'\\c35b'}.ui-grid-icon-left-open:before{content:'\\c35c'}.ui-grid-icon-right-open:before{content:'\\c35d'}.ui-grid-icon-angle-down:before{content:'\\c35e'}.ui-grid-icon-filter:before{content:'\\c35f'}.ui-grid-icon-sort-alt-up:before{content:'\\c360'}.ui-grid-icon-sort-alt-down:before{content:'\\c361'}.ui-grid-icon-ok:before{content:'\\c362'}.ui-grid-icon-menu:before{content:'\\c363'}.ui-grid-icon-indent-left:before{content:'\\e800'}.ui-grid-icon-indent-right:before{content:'\\e801'}.ui-grid-icon-spin5:before{content:'\\ea61'}.ui-grid[dir=rtl] .ui-grid-header-cell,.ui-grid[dir=rtl] .ui-grid-footer-cell,.ui-grid[dir=rtl] .ui-grid-cell{float:right !important}.ui-grid[dir=rtl] .ui-grid-column-menu-button{position:absolute;left:1px;top:0;right:inherit}.ui-grid[dir=rtl] .ui-grid-cell:first-child,.ui-grid[dir=rtl] .ui-grid-header-cell:first-child,.ui-grid[dir=rtl] .ui-grid-footer-cell:first-child{border-right:0}.ui-grid[dir=rtl] .ui-grid-cell:last-child,.ui-grid[dir=rtl] .ui-grid-header-cell:last-child{border-right:1px solid #d4d4d4;border-left:0}.ui-grid[dir=rtl] .ui-grid-header-cell:first-child .ui-grid-vertical-bar,.ui-grid[dir=rtl] .ui-grid-footer-cell:first-child .ui-grid-vertical-bar,.ui-grid[dir=rtl] .ui-grid-cell:first-child .ui-grid-vertical-bar{width:0}.ui-grid[dir=rtl] .ui-grid-menu-button{z-index:2;position:absolute;left:0;right:auto;background:#f3f3f3;border:1px solid #d4d4d4;cursor:pointer;min-height:27px;font-weight:normal}.ui-grid[dir=rtl] .ui-grid-menu-button .ui-grid-menu{left:0;right:auto}.ui-grid[dir=rtl] .ui-grid-filter-container .ui-grid-filter-button{right:initial;left:0}.ui-grid[dir=rtl] .ui-grid-filter-container .ui-grid-filter-button [class^="ui-grid-icon"]{right:initial;left:10px}.ui-grid-animate-spin{-moz-animation:ui-grid-spin 2s infinite linear;-o-animation:ui-grid-spin 2s infinite linear;-webkit-animation:ui-grid-spin 2s infinite linear;animation:ui-grid-spin 2s infinite linear;display:inline-block}@-moz-keyframes ui-grid-spin{0%{-moz-transform:rotate(0deg);-o-transform:rotate(0deg);-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-moz-transform:rotate(359deg);-o-transform:rotate(359deg);-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@-webkit-keyframes ui-grid-spin{0%{-moz-transform:rotate(0deg);-o-transform:rotate(0deg);-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-moz-transform:rotate(359deg);-o-transform:rotate(359deg);-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@-o-keyframes ui-grid-spin{0%{-moz-transform:rotate(0deg);-o-transform:rotate(0deg);-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-moz-transform:rotate(359deg);-o-transform:rotate(359deg);-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@-ms-keyframes ui-grid-spin{0%{-moz-transform:rotate(0deg);-o-transform:rotate(0deg);-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-moz-transform:rotate(359deg);-o-transform:rotate(359deg);-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@keyframes ui-grid-spin{0%{-moz-transform:rotate(0deg);-o-transform:rotate(0deg);-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-moz-transform:rotate(359deg);-o-transform:rotate(359deg);-webkit-transform:rotate(359deg);transform:rotate(359deg)}}.ui-grid-cell-focus{outline:0;background-color:#b3c4c7}.ui-grid-focuser{position:absolute;left:0;top:0;z-index:-1;width:100%;height:100%}.ui-grid-focuser:focus{border-color:#66afe9;outline:0;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 8px rgba(102,175,233,0.6);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 8px rgba(102,175,233,0.6)}.ui-grid-offscreen{display:block;position:absolute;left:-10000px;top:-10000px;clip:rect(0, 0, 0, 0)}.ui-grid-cell input{border-radius:inherit;padding:0;width:100%;color:inherit;height:auto;font:inherit;outline:none}.ui-grid-cell input:focus{color:inherit;outline:none}.ui-grid-cell input[type="checkbox"]{margin:9px 0 0 6px;width:auto}.ui-grid-cell input.ng-invalid{border:1px solid #fc8f8f}.ui-grid-cell input.ng-valid{border:1px solid #d4d4d4}.ui-grid-viewport .ui-grid-empty-base-layer-container{position:absolute;overflow:hidden;pointer-events:none;z-index:-1}.expandableRow .ui-grid-row:nth-child(odd) .ui-grid-cell{background-color:#fdfdfd}.expandableRow .ui-grid-row:nth-child(even) .ui-grid-cell{background-color:#f3f3f3}.ui-grid-cell.ui-grid-disable-selection.ui-grid-row-header-cell{pointer-events:none}.ui-grid-expandable-buttons-cell i{pointer-events:all}.scrollFiller{float:left;border:1px solid #d4d4d4}.ui-grid-tree-header-row{font-weight:bold !important}.movingColumn{position:absolute;top:0;border:1px solid #d4d4d4;box-shadow:inset 0 0 14px rgba(0,0,0,0.2)}.movingColumn .ui-grid-icon-angle-down{display:none}.ui-grid-pager-panel{display:flex;justify-content:space-between;align-items:center;position:absolute;left:0;bottom:0;width:100%;padding-top:3px;padding-bottom:3px;box-sizing:content-box}.ui-grid-pager-container{float:left}.ui-grid-pager-control{padding:5px 0;display:flex;flex-flow:row nowrap;align-items:center;margin-right:10px;margin-left:10px;min-width:135px;float:left}.ui-grid-pager-control button,.ui-grid-pager-control span,.ui-grid-pager-control input{margin-right:4px}.ui-grid-pager-control button{height:25px;min-width:26px;display:inline-block;margin-bottom:0;font-weight:normal;text-align:center;vertical-align:middle;touch-action:manipulation;cursor:pointer;background:#f3f3f3;border:1px solid #ccc;white-space:nowrap;padding:6px 12px;font-size:14px;line-height:1.42857143;border-radius:4px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;color:#eee}.ui-grid-pager-control button:hover{border-color:#adadad;text-decoration:none}.ui-grid-pager-control button:focus{border-color:#8c8c8c;text-decoration:none;outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}.ui-grid-pager-control button:active{border-color:#adadad;outline:0;-webkit-box-shadow:inset 0 3px 5px rgba(0,0,0,0.125);box-shadow:inset 0 3px 5px rgba(0,0,0,0.125)}.ui-grid-pager-control button:active:focus{outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}.ui-grid-pager-control button:active:hover,.ui-grid-pager-control button:active:focus{background-color:#c8c8c8;border-color:#8c8c8c}.ui-grid-pager-control button:hover,.ui-grid-pager-control button:focus,.ui-grid-pager-control button:active{color:#eee;background:#dadada}.ui-grid-pager-control button[disabled]{cursor:not-allowed;opacity:.65;filter:alpha(opacity=65);-webkit-box-shadow:none;box-shadow:none}.ui-grid-pager-control button[disabled]:hover,.ui-grid-pager-control button[disabled]:focus{background-color:#f3f3f3;border-color:#ccc}.ui-grid-pager-control input{display:inline;height:26px;width:50px;vertical-align:top;color:#555555;background:#fff;border:1px solid #ccc;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);-webkit-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;-o-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;padding:5px 10px;font-size:12px;line-height:1.5;border-radius:3px}.ui-grid-pager-control input:focus{border-color:#66afe9;outline:0;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 8px rgba(102,175,233,0.6);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 8px rgba(102,175,233,0.6)}.ui-grid-pager-control input[disabled],.ui-grid-pager-control input[readonly],.ui-grid-pager-control input::-moz-placeholder{opacity:1}.ui-grid-pager-control input::-moz-placeholder,.ui-grid-pager-control input:-ms-input-placeholder,.ui-grid-pager-control input::-webkit-input-placeholder{color:#999}.ui-grid-pager-control input::-ms-expand{border:0;background-color:transparent}.ui-grid-pager-control input[disabled],.ui-grid-pager-control input[readonly]{background-color:#eeeeee}.ui-grid-pager-control input[disabled]{cursor:not-allowed}.ui-grid-pager-control .ui-grid-pager-max-pages-number{vertical-align:bottom}.ui-grid-pager-control .ui-grid-pager-max-pages-number>*{vertical-align:bottom}.ui-grid-pager-control .ui-grid-pager-max-pages-number abbr{border-bottom:none;text-decoration:none}.ui-grid-pager-control .first-bar{width:10px;border-left:2px solid #4d4d4d;margin-top:-6px;height:12px;margin-left:-3px}.ui-grid-pager-control .first-bar-rtl{width:10px;border-left:2px solid #4d4d4d;margin-top:-6px;height:12px;margin-right:-7px}.ui-grid-pager-control .first-triangle{width:0;height:0;border-style:solid;border-width:5px 8.7px 5px 0;border-color:transparent #4d4d4d transparent transparent;margin-left:2px}.ui-grid-pager-control .next-triangle{margin-left:1px}.ui-grid-pager-control .prev-triangle{margin-left:0}.ui-grid-pager-control .last-triangle{width:0;height:0;border-style:solid;border-width:5px 0 5px 8.7px;border-color:transparent transparent transparent #4d4d4d;margin-left:-1px}.ui-grid-pager-control .last-bar{width:10px;border-left:2px solid #4d4d4d;margin-top:-6px;height:12px;margin-left:1px}.ui-grid-pager-control .last-bar-rtl{width:10px;border-left:2px solid #4d4d4d;margin-top:-6px;height:12px;margin-right:-11px}.ui-grid-pager-row-count-picker{float:left;padding:5px 10px}.ui-grid-pager-row-count-picker select{color:#555555;background:#fff;border:1px solid #ccc;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);-webkit-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;-o-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;padding:5px 10px;font-size:12px;line-height:1.5;border-radius:3px;height:25px;width:67px;display:inline;vertical-align:middle}.ui-grid-pager-row-count-picker select:focus{border-color:#66afe9;outline:0;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 8px rgba(102,175,233,0.6);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 8px rgba(102,175,233,0.6)}.ui-grid-pager-row-count-picker select[disabled],.ui-grid-pager-row-count-picker select[readonly],.ui-grid-pager-row-count-picker select::-moz-placeholder{opacity:1}.ui-grid-pager-row-count-picker select::-moz-placeholder,.ui-grid-pager-row-count-picker select:-ms-input-placeholder,.ui-grid-pager-row-count-picker select::-webkit-input-placeholder{color:#999}.ui-grid-pager-row-count-picker select::-ms-expand{border:0;background-color:transparent}.ui-grid-pager-row-count-picker select[disabled],.ui-grid-pager-row-count-picker select[readonly]{background-color:#eeeeee}.ui-grid-pager-row-count-picker select[disabled]{cursor:not-allowed}.ui-grid-pager-row-count-picker .ui-grid-pager-row-count-label{margin-top:3px}.ui-grid-pager-count-container{float:right;margin-top:4px;min-width:50px}.ui-grid-pager-count-container .ui-grid-pager-count{margin-right:10px;margin-left:10px;float:right}.ui-grid-pager-count-container .ui-grid-pager-count abbr{border-bottom:none;text-decoration:none}.ui-grid-pinned-container{position:absolute;display:inline;top:0}.ui-grid-pinned-container.ui-grid-pinned-container-left{float:left;left:0}.ui-grid-pinned-container.ui-grid-pinned-container-right{float:right;right:0}.ui-grid-pinned-container.ui-grid-pinned-container-left .ui-grid-header-cell:last-child{box-sizing:border-box;border-right:1px solid;border-width:1px;border-right-color:#aeaeae}.ui-grid-pinned-container.ui-grid-pinned-container-left .ui-grid-cell:last-child{box-sizing:border-box;border-right:1px solid;border-width:1px;border-right-color:#aeaeae}.ui-grid-pinned-container.ui-grid-pinned-container-left .ui-grid-header-cell:not(:last-child) .ui-grid-vertical-bar,.ui-grid-pinned-container .ui-grid-cell:not(:last-child) .ui-grid-vertical-bar{width:1px}.ui-grid-pinned-container.ui-grid-pinned-container-left .ui-grid-header-cell:not(:last-child) .ui-grid-vertical-bar{background-color:#d4d4d4}.ui-grid-pinned-container.ui-grid-pinned-container-left .ui-grid-cell:not(:last-child) .ui-grid-vertical-bar{background-color:#aeaeae}.ui-grid-pinned-container.ui-grid-pinned-container-left .ui-grid-header-cell:last-child .ui-grid-vertical-bar{right:-1px;width:1px;background-color:#aeaeae}.ui-grid-pinned-container.ui-grid-pinned-container-right .ui-grid-header-cell:first-child{box-sizing:border-box;border-left:1px solid;border-width:1px;border-left-color:#aeaeae}.ui-grid-pinned-container.ui-grid-pinned-container-right .ui-grid-cell:first-child{box-sizing:border-box;border-left:1px solid;border-width:1px;border-left-color:#aeaeae}.ui-grid-pinned-container.ui-grid-pinned-container-right .ui-grid-header-cell:not(:first-child) .ui-grid-vertical-bar,.ui-grid-pinned-container .ui-grid-cell:not(:first-child) .ui-grid-vertical-bar{width:1px}.ui-grid-pinned-container.ui-grid-pinned-container-right .ui-grid-header-cell:not(:first-child) .ui-grid-vertical-bar{background-color:#d4d4d4}.ui-grid-pinned-container.ui-grid-pinned-container-right .ui-grid-cell:not(:last-child) .ui-grid-vertical-bar{background-color:#aeaeae}.ui-grid-pinned-container.ui-grid-pinned-container-first .ui-grid-header-cell:first-child .ui-grid-vertical-bar{left:-1px;width:1px;background-color:#aeaeae}.ui-grid-column-resizer{top:0;bottom:0;width:5px;position:absolute;cursor:col-resize}.ui-grid-column-resizer.left{left:0}.ui-grid-column-resizer.right{right:0}.ui-grid-header-cell:last-child .ui-grid-column-resizer.right{border-right:1px solid #d4d4d4}.ui-grid[dir=rtl] .ui-grid-header-cell:last-child .ui-grid-column-resizer.right{border-right:0}.ui-grid[dir=rtl] .ui-grid-header-cell:last-child .ui-grid-column-resizer.left{border-left:1px solid #d4d4d4}.ui-grid.column-resizing{cursor:col-resize;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ui-grid.column-resizing .ui-grid-resize-overlay{position:absolute;top:0;height:100%;width:1px;background-color:#aeaeae}.ui-grid-row-saving .ui-grid-cell{color:#848484 !important}.ui-grid-row-dirty .ui-grid-cell{color:#610B38}.ui-grid-row-error .ui-grid-cell{color:#FF0000 !important}.ui-grid-row.ui-grid-row-selected>[ui-grid-row]>.ui-grid-cell{background-color:#C9DDE1}.ui-grid-disable-selection{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.ui-grid-selection-row-header-buttons{display:flex;align-items:center;height:100%;cursor:pointer}.ui-grid-selection-row-header-buttons::before{opacity:.1}.ui-grid-selection-row-header-buttons.ui-grid-row-selected::before,.ui-grid-selection-row-header-buttons.ui-grid-all-selected::before{opacity:1}.ui-grid-tree-row-header-buttons.ui-grid-tree-header{cursor:pointer;opacity:1}.ui-grid-tree-header-row{font-weight:bold !important}.ui-grid-tree-header-row .ui-grid-cell.ui-grid-disable-selection.ui-grid-row-header-cell{pointer-events:all}.ui-grid-cell-contents.invalid{border:1px solid #fc8f8f}
`;

var uimscss = `
multiselect {
    display:block;
}
multiselect .ui-ms-btn {
	display: flex;
	line-height: 1.4em;
	padding: 0.14em 0.4em;
	margin-bottom: 0;
	vertical-align: middle;
	cursor: pointer;
	color: #333333;
	text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);
	background-color: #f5f5f5;
	background-image: linear-gradient(to bottom, #ffffff, #e6e6e6);
	background-repeat: repeat-x;
	border: 1px solid #cccccc;
	border-bottom-color: #b3b3b3;
	border-radius: 4px;
	box-shadow: inset 0 1px 0 rgba(255,255,255,.2), 0 1px 2px rgba(0,0,0,.05);
    width: 100%;
}

multiselect .ui-ms-btn:hover, multiselect .ui-ms-btn:focus, multiselect .ui-ms-btn:active, multiselect .ui-ms-btn.disabled, multiselect .ui-ms-btn[disabled] {
    color: #333333;
    background-color: #e6e6e6;
    text-decoration: none;
}

multiselect .ui-ms-btn:hover, multiselect .ui-ms-btn:focus {
    background-position: 0 -1.1em;
    transition: background-position 0.1s linear;
}
multiselect .ui-ms-btn:focus {
    outline: thin dotted #333;
    outline-offset: -2px;
}

multiselect .ui-ms-dropdown
{
	position: relative;
}
multiselect .ui-ms-dropdown-menu {
	position: fixed;
	top: inherit;
	left: inherit;
	z-index: 1000;
	display: none;
	float: left;
	min-width: 160px;
	margin: 0;
	list-style: none;
	background-color: #ffffff;
	border: 1px solid #ccc;
	border: 1px solid rgba(0, 0, 0, 0.2);
	border-radius: 6px;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
	background-clip: padding-box;
    max-height: 300px;
    overflow: hidden;
    width: auto;
    box-sizing: border-box;
    padding: 0.2em;
}
multiselect .ui-ms-dropdown-menu > li
{
	flex; 0;
}

multiselect .ui-ms-options-list
{
	flex: 1;
	list-style: none;
    overflow-y: auto;
    box-sizing: border-box;
	padding: 0;
}

multiselect .open > .ui-ms-dropdown-menu {
    display: flex;
	flex-direction:column;
}
multiselect .ui-ms-dropdown-menu > li > a, multiselect .ui-ms-options-list > li > a {
    padding: 0.3em 0.6em;
	font-weight: normal;
    cursor:pointer;
}
multiselect .ui-ms-pull-left {
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow:hidden;
	text-align:left;
	flex:1;
}
multiselect .ui-ms-pull-right {
	flex:0;
}

multiselect .ui-ms-caret  {
	display: inline-block;
	width: 0;
	height: 0;
	vertical-align: top;
	border-top: 4px solid #000000;
	border-right: 4px solid transparent;
	border-left: 4px solid transparent;
	content: "";
	margin-top: 0.6em;
	margin-left: 0.14em;
}

multiselect .ui-ms-input-block-level {
	margin-left:0;
	width: 100%;
	height: 1.4em;
	box-sizing: border-box;
	display: inline-block;
	padding: 0.14em 0.4em;
	margin-bottom: 0.2em;
	color: #555555;
	border-radius: 4px;
	vertical-align: middle;
    background-color: #ffffff;
    border: 1px solid #cccccc;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    transition: border linear .2s, box-shadow linear .2s;
}

multiselect .ui-ms-btn-link:hover, multiselect .ui-ms-btn-link:focus {
    color: #005580;
    text-decoration: underline;
    background-color: transparent;
}

multiselect .ui-ms-btn-link {
    border-color: transparent;
    cursor: pointer;
    color: #0088cc;
    border-radius: 0;
}

multiselect .ui-ms-btn-link, multiselect .ui-ms-btn-link:active, multiselect .ui-ms-btn-link[disabled] {
    background-color: transparent;
    background-image: none;
    box-shadow: none;
}

multiselect .ui-ms-btn-small {
	padding: 0.14em 0.6em;
	font-size: 0.7em;
	border-radius: 3px;
}

multiselect .ui-ms-dropdown-menu > li > div
{
	display: inline-block;
}
multiselect .ui-ms-dropdown-menu > li > div.modes
{
	padding-right: 0.8em;
	float:right;
}


multiselect .ui-ms-btn-mode {
    display: inline-block;
	padding: 0.2em 0.2em;
	font-size: 0.7em;
	border-radius: 3px;
	border: 1px solid transparent;
    cursor: pointer;
	margin: 0;
	margin-right: 0.2em;
	color: #888;
    background-color: transparent;
    background-image: none;
}

multiselect .ui-ms-btn-mode.on {
	color: #444;
	border-color: #444;
}

multiselect .ui-ms-btn-mode:hover, .ui-ms-btn-mode:active {
	color: #000;
}
multiselect .ui-ms-btn-mode.on:hover,.ui-ms-btn-mode.on:active{
	border-color: #000;
}


multiselect [class^="ui-ms-icon-"], [class*=" ui-ms-icon-"] {
    display: inline-block;
    width: 1em;
    height: 1em;
	font-style:normal;
}


`;

var gridctrl = `
var sw = document.querySelector(".catalog__view-switch");
var isNew = !sw;

var gridhtml = \`
<div id="datagridview" class="ng-hide" ng-show="viewSwitcher.activeView == 'datagrid'" style="width:100%" ng-controller="DataGridController as dg">
	<div class="dg-option" ng-click="dg.hideOwned=!dg.hideOwned"><i class="dg-check" ng-class="{'dg-checked':dg.hideOwned}"></i>Hide owned</div>
	<div class="dg-option" ng-click="dg.hideDLC=!dg.hideDLC"><i class="dg-check" ng-class="{'dg-checked':dg.hideDLC}"></i>Hide DLCs</div>
	<div class="dg-stat">Games displayed: {{dg.grid.getVisibleRowCount()}} of {{dg.fullData.length || 0}}</div>
	<br>
    <div ui-grid="dgOptions" class="datagrid" ui-grid-auto-resize ui-grid-resize-columns style="width:100%"></div>
	<div class="btn dg-btn" ng-click="dg.saveToFile()"><span>&#x2913;</span>Save configuration</div><div class="btn dg-btn" ng-click="dg.restoreFromFile()"><span>&#x2912;</span>Load configuration</div>
	<a class="dg-download"></a><input type="file" class="dg-upload">
</div>
\`;
var switchHtml = \`
<svg class="expand_button ng-hide" ng-show="!cat_expanded" ng-click="cat_expanded=!cat_expanded;catalog.\$window.dgCont.expandSaveData();catalog.\$window.dgCont.grid.refreshCanvas()" width="16" height="14" viewBox="0 0 50 40" preserveAspectRatio="xMidYMid meet">
<title>Expand to full screen width</title>
<polygon points="0,0 10,0 30,20 10,40 0,40 20,20"></polygon>
<polygon points="20,0 30,0 50,20 30,40 20,40 40,20"></polygon>
</svg>
<svg class="expand_button ng-hide" ng-show="cat_expanded" ng-click="cat_expanded=!cat_expanded;catalog.\$window.dgCont.expandSaveData();catalog.\$window.dgCont.grid.refreshCanvas()" width="16" height="14" viewBox="0 0 50 40" preserveAspectRatio="xMidYMid meet">
<title>Shrink back to screen center</title>
<polygon points="50,0 40,0 20,20 40,40 50,40 30,20"></polygon>
<polygon points="30,0 20,0 0,20 20,40 30,40 10,20"></polygon>
</svg>\`;

var upload,download;

if(!isNew)
{
	var cat = document.querySelector(".catalog__body");
	var tabs = document.querySelector(".catalog__tabs-wrapper--row");
	var \$switch = angular.element(sw);
	var \$catalog = angular.element(cat);
	var \$tabs = angular.element(tabs);
	var \$switchGrid = angular.element(sw.querySelector('.view-switch-btn[ng-click*="grid"]'));
	var \$switchList = angular.element(sw.querySelector('.view-switch-btn[ng-click*="list"]'));

	\$switchList.removeClass('view-switch-btn-list');
	\$switchList.addClass('view-switch-btn-grid');
	\$switchGrid.attr('ng-class', "{'view-switch-btn--active': viewSwitcher.activeView == 'grid'}");

	for(let c of ['.catalog__games-list','.catalog__sidebar','.catalog__search-container','.catalog__sort-by','.filters-status','.filters__toggle-clear','.catalog__paginator-wrapper'])
		angular.element(document.querySelector(c)).attr('ng-hide', "viewSwitcher.activeView == 'datagrid'");

	\$tabs.append(\`<div
	class="tabs-row-option ng-hide dg-tab-sep" ng-hide="viewSwitcher.activeView != 'datagrid'">&nbsp;</div><div
	class="tabs-row-option ng-hide" ng-hide="viewSwitcher.activeView != 'datagrid'" ng-click="catalog.selectedTab = 'tab_wishlist'" ng-class="{'tabs-row-option--selected': catalog.selectedTab === 'tab_wishlist'}">Wishlist</div><div 
	class="tabs-row-option ng-hide" ng-hide="viewSwitcher.activeView != 'datagrid'" ng-click="catalog.selectedTab = 'tab_blacklist'" ng-class="{'tabs-row-option--selected': catalog.selectedTab === 'tab_blacklist'}">Blacklist</div>\`);

	\$switch.append(\`
	<svg class="view-switch-btn view-switch-btn-list view-switch-btn" ng-click="catalog.\$window.startDatagrid(this)" ng-class="{'view-switch-btn--active': viewSwitcher.activeView == 'datagrid'}" width="14" height="14" viewBox="0 0 40 40" preserveAspectRatio="xMidYMid meet">
	<rect x="0" y="0" width="40" height="6"></rect>
	<rect x="0" y="34" width="40" height="6"></rect>
	<rect x="0" y="14" width="40" height="6"></rect>
	<rect x="0" y="0" width="6" height="40"></rect>
	<rect x="34" y="0" width="6" height="40"></rect>
	<rect x="13" y="0" width="4" height="40"></rect>
	<rect x="24" y="0" width="4" height="40"></rect>
	</svg>\`);

	\$catalog.append(gridhtml);

	download = document.querySelector(".dg-download");
	upload = document.querySelector(".dg-upload");

	// full width switch
	\$switch.css('left', '20px');
	var \$cfs = angular.element(document.querySelector('.catalog__filters-sorting'));
	\$cfs.css('width','calc(100% - 20px)');
	\$cfs.append(switchHtml);
	angular.element(document.querySelectorAll('.container--catalog')).attr('ng-class', "{'catalog-expanded': cat_expanded}");
}
else
	var installGrid = function()
	{
		sw = document.querySelector(".display-switch");
		var \$switch = angular.element(sw);
		var \$switchGrid = angular.element(sw.querySelector('.display-switch__button[selenium-id*="grid"]'));
		var \$switchList = angular.element(sw.querySelector('.display-switch__button[selenium-id*="list"]'));

		\$switch.append(\`
			<button class="display-switch__button display-switch__button" 
			ng-class="{'display-switch__button--active': viewSwitcher.activeView=='datagrid'}"
			ng-click="dg.\$window.startDatagrid(this)"
			selenium-id="datagridButton">
			<span class="display-switch__icon datagrid-icon">
			</span></button>
		\`);

		\$switchGrid.attr('ng-class', "{'display-switch__button--active': viewSwitcher.activeView == 'grid'}");
		\$switchGrid.attr('ng-click', "viewSwitcher.activeView = 'grid'");
		\$switchList.attr('ng-class', "{'display-switch__button--active': viewSwitcher.activeView == 'list'}");
		\$switchList.attr('ng-click', "viewSwitcher.activeView = 'list'");


		for(let c of ['filter-clearing-list','paginated-products-grid','.catalog__filters-outer-wrapper',
			'.catalog__section-header','.catalog__search','.sort__wrapper','small-pagination'])
			angular.element(document.querySelector(c)).attr('ng-hide', "viewSwitcher.activeView=='datagrid'");

		// reintroduce tabs from old page
		var \$header = angular.element(document.querySelector(".catalog__header"));
		\$header.attr('ng-class', "{'dg-header':viewSwitcher.activeView == 'datagrid'}");
		\$header.append(\`<div class="dg-tabs ng-hide" ng-hide="viewSwitcher.activeView != 'datagrid'"><div
			class="tabs-row-option" ng-click="catalog.selectedTab = 'tab_everything'" ng-class="{'tabs-row-option--selected': catalog.selectedTab === 'tab_everything'}">Everything</div><div
			class="tabs-row-option" ng-click="catalog.selectedTab = 'tab_new_releases'" ng-class="{'tabs-row-option--selected': catalog.selectedTab === 'tab_new_releases'}">New Releases</div><div
			class="tabs-row-option" ng-click="catalog.selectedTab = 'tab_upcoming'" ng-class="{'tabs-row-option--selected': catalog.selectedTab === 'tab_upcoming'}">Upcoming</div><div
			class="tabs-row-option" ng-click="catalog.selectedTab = 'tab_on_sale'" ng-class="{'tabs-row-option--selected': catalog.selectedTab === 'tab_on_sale'}">On sale</div><div
			class="tabs-row-option dg-tab-sep">&nbsp;</div><div
			class="tabs-row-option" ng-click="catalog.selectedTab = 'tab_wishlist'" ng-class="{'tabs-row-option--selected': catalog.selectedTab === 'tab_wishlist'}">Wishlist</div><div 
			class="tabs-row-option" ng-click="catalog.selectedTab = 'tab_blacklist'" ng-class="{'tabs-row-option--selected': catalog.selectedTab === 'tab_blacklist'}">Blacklist</div></div>\`);


		var \$catalog = angular.element(document.querySelector(".catalog__display-wrapper"));
		\$catalog.append(gridhtml);
		angular.element(document.querySelector('#datagridview')).removeAttr('ng-controller');

		download = document.querySelector(".dg-download");
		upload = document.querySelector(".dg-upload");

		// full width switch
		\$switch.css('left', '20px');
		\$header.css('width','calc(100% - 20px)');
		\$header.append(switchHtml);
		angular.element(document.querySelectorAll('.app__container')).attr('ng-class', "{'catalog-expanded': cat_expanded}");


		dgCont.\$scope.viewSwitcher = {activeView: 
			angular.element(document.querySelector('.display-switch__button--active')).attr('selenium-id') == 'gridButton' ? 'grid':'list'};
		dgCont.\$scope.catalog = dgCont;
		dgCont.selectedTab = 'tab_everything';
		dgCont.\$compile(document.querySelector('.wrapper'))(dgCont.\$scope);
		dgCont.\$scope.\$digest();
	};

		   

var dgCont;

var storage = {
	data: undefined,
	set: function(key, value) 
	{
		if(!this.data)
			this.data = {};
		this.data[key] = value;
	},

	get: function(key)
	{
		if(!this.data)
			this.data = {};
		return this.data[key];
	},

	save: function()
	{
		window.localStorage['goggrid'] = JSON.stringify(this.data);
	},

	restore: function()
	{
		var v = window.localStorage['goggrid'];
		this.data = v ? JSON.parse(v) : {};
	},
};

function DataGridController(\$scope, \$http, \$window, \$compile, cart, wishlist)
{
	var me = this;
    \$scope.genres = [];
    \$scope.oss = ['Windows','Mac','Linux'];
	this.cart = cart;
	this.wishlist = wishlist;
	this.cartSet = new Set();
	this.wishlistSet = new Set();
	this.showImages = false;
	\$window.gogEventBus.subscribe('cart', 'updated', this.cartUpdate.bind(this));
	\$window.gogEventBus.subscribe('wishlist', 'updated', this.wishlistUpdate.bind(this));
	\$window.gogEventBus.subscribe('ownedProducts', 'updated', this.ownedUpdate.bind(this));

	this.\$scope = \$scope;
	this.\$http = \$http;
	this.\$compile = \$compile;
	this.\$window = \$window;
	this.data = [];
	this.blacklist = {};

	var hdrTempl = "<div role=\\"columnheader\\" ng-class=\\"{ 'sortable': sortable, 'ui-grid-header-cell-last-col': isLastCol }\\" ui-grid-one-bind-aria-labelledby-grid=\\"col.uid + '-header-text ' + col.uid + '-sortdir-text'\\" aria-sort=\\"{{col.sort.direction == asc ? 'ascending' : ( col.sort.direction == desc ? 'descending' : (!col.sort.direction ? 'none' : 'other'))}}\\"><div role=\\"button\\" tabindex=\\"0\\" ng-keydown=\\"handleKeyDown(\$event)\\" class=\\"ui-grid-cell-contents ui-grid-header-cell-primary-focus\\" col-index=\\"renderIndex\\" title=\\"TOOLTIP\\"><span class=\\"ui-grid-header-cell-label\\" ui-grid-one-bind-id-grid=\\"col.uid + '-header-text'\\">##HDR## {{CUSTOM_FILTERS }}</span> <span ui-grid-one-bind-id-grid=\\"col.uid + '-sortdir-text'\\" ui-grid-visible=\\"col.sort.direction\\" aria-label=\\"{{getSortDirectionAriaLabel()}}\\"><i ng-class=\\"{ 'ui-grid-icon-up-dir': col.sort.direction == asc, 'ui-grid-icon-down-dir': col.sort.direction == desc, 'ui-grid-icon-blank': !col.sort.direction }\\" title=\\"{{isSortPriorityVisible() ? i18n.headerCell.priority + ' ' + ( col.sort.priority + 1 )  : null}}\\" aria-hidden=\\"true\\"></i> <sub ui-grid-visible=\\"isSortPriorityVisible()\\" class=\\"ui-grid-sort-priority-number\\">{{col.sort.priority + 1}}</sub></span></div><div role=\\"button\\" tabindex=\\"0\\" ui-grid-one-bind-id-grid=\\"col.uid + '-menu-button'\\" class=\\"ui-grid-column-menu-button\\" ng-if=\\"grid.options.enableColumnMenus && !col.isRowHeader  && col.colDef.enableColumnMenu !== false\\" ng-click=\\"toggleMenu(\$event)\\" ng-keydown=\\"headerCellArrowKeyDown(\$event)\\" ui-grid-one-bind-aria-label=\\"i18n.headerCell.aria.columnMenuButtonLabel\\" aria-haspopup=\\"true\\"><i class=\\"ui-grid-icon-angle-down\\" aria-hidden=\\"true\\">&nbsp;</i></div><div ui-grid-filter></div></div>";
	var nf = this.numFilter.bind(this);
	var of = this.osFilter.bind(this);


	\$scope.dgOptions = {
		onRegisterApi: (gridApi) => this.grid = gridApi.grid,
		data: 'dg.data',
		minRowsToShow: 15,
		enableGridMenu: true,
		enableFiltering: true,
		gridMenuCustomItems: [ {
			title: 'Reset column widths',
			action: () => {
				for(let col of this.grid.columns)
				{
					col.width = col.colDef.origWidth || "*";
					col.colDef.width = col.colDef.origWidth;
					this.saveData();
					this.grid.refresh();
				}
			},
			context: \$scope
		  } ],
		columnDefs: [ {
				name: 'rank', 
				shortDisplayName: '#', 
				displayName: 'Bestselling rank (#)', 
				type: 'number',
				filter: {condition:nf}, 
				width: 45, 
				cellClass: 'datagrid-rank'
			}, {
				name: 'title', 
				shortDisplayName: 'Title', 
				displayName: 'Title', 
				field: 'titleWithMods',
				cellTemplate: new Promise((resolve, reject) => resolve(
\`<div class="ui-grid-cell-contents datagrid-title" title="TOOLTIP"><a 
href="{{row.entity.url}}" ng-class="{dlc:row.entity.type===3}" target="_new"><img 
ng-if="grid.appScope.dg.showImages" src="{{row.entity.image}}_product_tile_116.jpg"></img><span
ng-if="row.entity.type===3">[DLC]&nbsp;</span>{{row.entity.title}}<span
ng-if="row.entity.owned">&nbsp(OWNED)</span><span class="datagrid-title-mod indev" 
ng-if="row.entity.isInDevelopment">InDev</span><span class="datagrid-title-mod soon" 
ng-if="row.entity.isComingSoon">SOON</span><span class="datagrid-title-mod new" 
ng-if="row.entity.new">New!</span></a></div>\` )),
				 menuItems: [ {
		            title: 'Show thumbnail images',
		            action: this.toggleImages.bind(this),
					icon: 'ui-grid-icon-blank',
		            context: \$scope
		          } ],
			}, {
				name: 'genre', 
				shortDisplayName: 'Genre', 
				displayName: 'Genre', 
				field: 'genreStr', 
				filters: [
					{ condition:this.genreFilter.bind(this, false) },
					{ condition:this.genreFilter.bind(this, true) }
				],
				width: 135, 
				cellTemplate: 
\`<div class="ui-grid-cell-contents datagrid-genre" title="TOOLTIP"><div></div><span
>{{COL_FIELD CUSTOM_FILTERS}}</span><div></div></div>\`, 
				filterHeaderTemplate:
\`<div class="ui-grid-filter-container" ng-style="col.extraStyle" 
ng-repeat="colFilter in col.filters" 
ng-class="{'ui-grid-filter-cancel-button-hidden' : colFilter.disableCancelFilterButton === true }"><multiselect 
class="datagrid-ms" multiple="true" ng-model="colFilter.term"
options="c for c in grid.appScope.genres"
change="grid.appScope.dg.genreFilterHeader(this, \$parent.colFilter)"></multiselect><div 
role="button" class="ui-grid-filter-button-select" 
ng-click="removeFilter(colFilter, \$index)" ng-if="!colFilter.disableCancelFilterButton" 
ng-disabled="colFilter.term === undefined || colFilter.term === null || !colFilter.term.options || colFilter.term.options.length === 0" 
ng-show="colFilter.term !== undefined && colFilter.term != null && colFilter.term.options && colFilter.term.options.length"><i 
class="ui-grid-icon-cancel" ui-grid-one-bind-aria-label="aria.removeFilter">&nbsp;</i></div></div>\`
			}, {
				name: 'devpub', 
				shortDisplayName: 'Developer/Publisher', 
				displayName: 'Developer/Publisher', 
				width: 155, 
				cellTemplate: 
\`<div class="ui-grid-cell-contents datagrid-devpub" title="TOOLTIP"
>{{row.entity.developer}}<br/>{{row.entity.publisher}}</div>\`
			}, {
				name: 'year', 
				shortDisplayName: 'Year', 
				displayName: 'Release year', 
				filter: {condition:nf}, 
				width: 60, 
				cellTemplate: 
\`<div class="ui-grid-cell-contents datagrid-year" title="TOOLTIP" ng-if="row.entity.year"
>{{COL_FIELD}}</div><div class="ui-grid-cell-contents datagrid-year" title="TOOLTIP" ng-if="!row.entity.year"
>TBA</div>\`,
			}, {
				name: 'os', 
				shortDisplayName: 'OS', 
				displayName: 'Supported OS', 
				filter: { condition:of },
				width: 53, 
				cellTemplate: 
\`<div class="ui-grid-cell-contents datagrid-os" title="TOOLTIP"><svg 
role="img" ng-if="row.entity.worksOn.Windows"><use xlink:href="/svg/cc041adc.svg#windows"></use></svg><svg
role="img" ng-if="row.entity.worksOn.Mac"><use xlink:href="/svg/cc041adc.svg#mac"></use></svg><svg 
role="img" ng-if="row.entity.worksOn.Linux"><use xlink:href="/svg/cc041adc.svg#linux"></use></svg></div>\`, 
				filterHeaderTemplate:
\`<div class="ui-grid-filter-container" ng-style="col.extraStyle" 
ng-repeat="colFilter in col.filters" 
ng-class="{'ui-grid-filter-cancel-button-hidden' : colFilter.disableCancelFilterButton === true }"><multiselect 
class="datagrid-ms" no-filter="true" ng-model="colFilter.term"
options="c for c in grid.appScope.oss" 
change="grid.appScope.dg.osFilterHeader(this)"></multiselect><div 
role="button" class="ui-grid-filter-button-select" 
ng-click="removeFilter(colFilter, \$index)" ng-if="!colFilter.disableCancelFilterButton" 
ng-disabled="colFilter.term === undefined || colFilter.term === null || !colFilter.term.length" 
ng-show="colFilter.term !== undefined && colFilter.term !== null && colFilter.term.length"><i 
class="ui-grid-icon-cancel" ui-grid-one-bind-aria-label="aria.removeFilter">&nbsp;</i></div></div>\`
			}, {
				name: 'rating', 
				shortDisplayName: 'Rating', 
				displayName: 'User rating', 
				filter: {condition:nf}, 
				type: 'number',
				width: 75, 
				cellTemplate: 
\`<div class="ui-grid-cell-contents datagrid-rating" ng-if="row.entity.rating > 0" title="TOOLTIP">{{COL_FIELD}}<br/><span
>{{row.entity.ratingStr}}</span></div><div class="ui-grid-cell-contents datagrid-norating" if="row.entity.rating==0">N/A</div>\`
			}, {
				name: 'discount', 
				shortDisplayName: 'Disc.', 
				displayName: 'Discount', 
				type: 'number',
				filter: {condition:nf}, 
				width: 65, 
				cellTemplate: 
\`<div class="ui-grid-cell-contents datagrid-discount" title="TOOLTIP"><div ng-if="row.entity.discount"><span 
class="product-tile__discount" ng-if="!row.entity.promoStr">{{row.entity.discountStr}}</span><a
class="product-tile__discount" href="{{row.entity.promoStr}}" ng-if="row.entity.promoStr" target="_new"
>{{row.entity.discountStr}}</a></div></div>\`
			}, {
				name: 'price', 
				shortDisplayName: 'Price', 
				displayName: 'Price', 
				field: '_price', 
				type: 'number',
				filter: {condition:(t,v)=>nf(t,v,true)}, 
				width: 120, 
				cellTemplate: 
\`<div class="ui-grid-cell-contents datagrid-price" title="TOOLTIP"><div><div></div><span 
ng-if="row.entity.bonusStr" class="bon">{{row.entity.bonusStr}}</span><span 
ng-if="row.entity.discount" class="bp">{{row.entity.basePriceStr}}</span></div><span
ng-class="{free: row.entity.price.isFree || !row.entity.isPriceVisible}">{{row.entity.priceStr}}</span></div>\`
			}, {
				name: 'cart_wishlist', 
				shortDisplayName: '', 
				displayName: 'Cart / Wishlist', 
				enableFiltering: false,
				enableSorting: false,
				enableColumnMenu: false,
				width: 72, 
				minWidth: 72, 
				cellTemplate: 
\`<div class="ui-grid-cell-contents datagrid-cart" title="TOOLTIP" ng-class="{cart:row.entity.inCart,wl:row.entity.inWishlist,bl:row.entity.inBlacklist}"><div><button 
ng-click="grid.appScope.dg.toggleWishlist(row.entity)" ng-show="row.entity.isWishlistable && !row.entity.owned" 
class="wl"><i></i></button></div><div><button ng-click="grid.appScope.dg.toggleBlacklist(row.entity)" 
ng-show="!row.entity.owned" class="bl"><i></i></button></div><div><button 
ng-click="grid.appScope.dg.toggleCart(row.entity)" ng-show="row.entity.buyable" class="cart"><svg 
role="img" ng-show="!row.entity.inCart"><use xlink:href="/svg/cc041adc.svg#button-add-to-cart"></use></svg><svg 
role="img" ng-show="row.entity.inCart"><use xlink:href="/svg/cc041adc.svg#button-in-cart"></use></svg>
</button></div></div>\`
			},

		],
		rowTemplate: 
\`<div ng-class="{'datagrid-owned-row':row.entity.owned && !row.entity.inCart,'datagrid-cart-row':row.entity.inCart,'datagrid-wl-row':row.entity.inWishlist && !row.entity.inCart,'datagrid-bl-row':row.entity.inBlacklist}"><div 
ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" 
ui-grid-one-bind-id-grid="rowRenderIndex + '-' + col.uid + '-cell'" class="ui-grid-cell" 
ng-class="{ 'ui-grid-row-header-cell': col.isRowHeader }" 
role="{{col.isRowHeader ? 'rowheader' : 'gridcell'}}" ui-grid-cell></div></div>\`,
	};
	\$scope.dgOptions.columnDefs.forEach(d=>d.headerCellTemplate = hdrTempl.replace("##HDR##",d.shortDisplayName)); 
	if(!isNew)
		\$scope.\$watch('\$parent.catalog.selectedTab', this.baseVisibility.bind(this));
	else
		\$scope.\$watch('catalog.selectedTab', this.baseVisibility.bind(this));

	dgCont = this;
}

DataGridController.prototype.start = async function()
{
	if(this.fullData)
		return;

	this.restoreData();

	this.grid.api.core.on.filterChanged(this.\$scope, this.saveData.bind(this));
	this.grid.api.core.on.columnVisibilityChanged(this.\$scope, this.saveData.bind(this));
	this.grid.api.core.on.sortChanged(this.\$scope, this.saveData.bind(this));
	this.grid.api.colResizable.on.columnSizeChanged(this.\$scope, this.saveData.bind(this));

	this.\$scope.\$watch('dg.hideDLC', this.switchChanged.bind(this));
	this.\$scope.\$watch('dg.hideOwned', this.switchChanged.bind(this));

	var allGames = await this.getGames('/games/ajax/filtered?mediaType=game&sort=bestselling');
	var newGames = await this.getGames('/games/ajax/filtered?mediaType=game&sort=bestselling&availability=new');
	if(isNew)
		this.wishlistUpdate(null);

	this.\$scope.genres = [...new Set(allGames.map(d=>d.genres).flat().filter(g=>g.length))].sort();
	this.newGameIds = new Set(newGames.map(d=>d.id));

	this.cnt = 0;
	allGames.forEach(this.dataMod.bind(this));

	this.fullData = allGames;
	this.baseVisibility();

	this.grid.refresh();
};

DataGridController.prototype.getGames = async function(url)
{
	var me = this;
	var games;
	try
	{
		games = await this.\$http.get(\`\${url}&page=1\`);
	}
	catch(err)
	{
		return [];
	}
	var pages = games.data.totalPages;
	var allGames = new Array(pages);
	allGames[0] = games.data.products;
	var retries = 0, done = 1;
	while(done < pages && retries++ < 5)
	{
		if(done > 1)
			await new Promise(function(resolve) { setTimeout(resolve, 500); });
		await new Promise(function(resolve, reject)
		{
			var requests = 0, todo = allGames.length - allGames.filter(a=>a).length;
			for(let i=2;i<=pages;i++)
			{
				if(allGames[i-1])
					continue;
				me.\$http.get(\`\${url}&page=\${i}\`).
					then(function(r)
					{
						if(r.data?.products?.length)
						{
							allGames[r.data.page-1] = r.data.products;
							done++;
						}
						if(++requests >= todo)
							resolve();
					}, function(err)
					{
						if(++requests >= todo)
							resolve();
					});
			}
		});
	}

	return allGames.filter(a=>a).flat();
};


DataGridController.prototype.dataMod = function(entry)
{
	if(this.ownedSet)
		entry.owned = this.ownedSet.has(entry.id);
	entry.new = this.newGameIds.has(entry.id);

	entry.rank = ++this.cnt;

	entry.titleWithMods = entry.title;
	if(entry.type == 3)
		entry.titleWithMods += "[DLC]";
	if(entry.owned)
		entry.titleWithMods += "(OWNED)";
	if(entry.isInDevelopment)
		entry.titleWithMods += " InDev";
	if(entry.isComingSoon)
		entry.titleWithMods += " SOON";

	entry.devpub = entry.developer+" "+entry.publisher;
	if(!entry.globalReleaseDate)
		entry.year = 0;
	else
		entry.year = new Date(entry.globalReleaseDate*1000).getFullYear();
	if(entry.isComingSoon)
		entry.rating = 0;
	else 
	{
		entry.ratingStr = '';

		for(let i=0;i<~~((entry.rating+2)/10);i++)
			entry.ratingStr += '\\ue601';
		if(entry.rating%10 >2 && entry.rating%10 < 8)
			entry.ratingStr += '\\ue603';
		for(let i=entry.ratingStr.length; i<5 ; i++)
			entry.ratingStr += '\\ue602';
		entry.rating /= 10.0;
	}

	entry.genreStr = entry.genres.join(', ');
	entry.discount = entry.price.discount;
	entry.discountStr = '-'+entry.price.discount+'%';
	if(entry.price.promoId && entry.price.promoId.length)
		entry.promoStr = "/promo/"+entry.price.promoId;
	entry.os = 0;
	if(entry.worksOn.Windows)
		entry.os += 4;
	if(entry.worksOn.Mac)
		entry.os += 2;
	if(entry.worksOn.Linux)
		entry.os += 1;
	entry.basePriceStr = entry.price.baseAmount+" "+entry.price.symbol;
	entry.priceStr = !entry.isPriceVisible ? "TBA" : entry.price.isFree ? "Free" : (entry.price.amount+" "+entry.price.symbol);
	entry.bonusStr = entry.price.bonusStoreCreditAmount === "0.00" ? null : ("+"+entry.price.bonusStoreCreditAmount+" "+entry.price.symbol);
	entry._price = !entry.isPriceVisible ? -1 : parseFloat(entry.price.amount);
	entry.inCart = this.cartSet.has(entry.id);
	entry.inWishlist = this.wishlistSet.has(entry.id);
	if(this.blacklist[entry.id.toString()])
		if(entry.inCart || entry.inWishlist || entry.owned)
			delete this.blacklist[entry.id.toString()];
		else
			entry.inBlacklist = true;
};

const numExp = /(-?[\\d.]+(?!\\s*-|[\\d.]))|(?:(-?[\\d.]+)\\s*-\\s*(-?[\\d.]+))|(?:(<|>|<=|>=)\\s*(-?[\\d.]+))/g;

DataGridController.prototype.numFilter = function(searchTerm, cellValue, round)
{
	var ok = false, any = false;
	var roundVal = round ? 0.01 : 0;
	searchTerm = searchTerm.replace(/\\\\([-.])/g, (m,p)=>p); // uigrid adds \\ for some reason
	searchTerm.replace(numExp, function(match, fullNr, rangeStart, rangeEnd, operator, operVal)
	{
		any = true;
		if(ok)
			return;
		if(fullNr && fullNr.length)
		{
			var fullNrF = parseFloat(fullNr);
			ok = cellValue >= fullNrF-roundVal && cellValue <= fullNrF;
		}
		else if(rangeStart && rangeStart.length)
			ok = cellValue >= parseFloat(rangeStart)-roundVal && cellValue <= parseFloat(rangeEnd);
		else
		{
			var val = parseFloat(operVal);
			if(operator === '>=')
				val -= roundVal;
			ok = eval('cellValue'+operator+val);
		}
		return match;
	});
	return ok || !any;
};

DataGridController.prototype.genreFilterHeader = function(msscope, colFilter)
{
	var exclude = colFilter !== this.grid.getColumn('genre').filters[0];
	var sel = colFilter.term;
	var hdr;
	if(!sel || !sel.options || !sel.options.length)
		hdr = \`<i>\${exclude?'Exclude':'Include'}</i>\`;
	else
	{
		hdr = (exclude ? '-':'')+sel.options[0];
		if(sel.options.length > 1)
			hdr += '('+(sel.mode && sel.mode.and?'&':'+')+(sel.options.length-1)+')';
	}
	angular.element(msscope.element[0].querySelector('.ui-ms-pull-left')).html(hdr);
};

DataGridController.prototype.genreFilter = function(exclude, searchTerm, cellValue, row)
{
	if(!searchTerm || !searchTerm.options || !searchTerm.options.length)
		return true;
	var ok;
	if(searchTerm.mode.and)
	{
		ok = true;
		for(let opt of searchTerm.options)
			if(row.entity.genres.indexOf(opt) == -1)
			{
				ok = false;
				break;
			}
	}
	else
	{
		ok = false;
		for(let genre of row.entity.genres)
			if(searchTerm.options.indexOf(genre) != -1)
			{
				ok = true;
				break;
			}
	}
	return ok != exclude;
}

DataGridController.prototype.osFilterHeader = function(msscope)
{
	var sel = this.grid.getColumn('os').filters[0].term;
	var hdr;
	if(!sel || !sel.length)
		hdr =  '&nbsp;';
	else
	{
		hdr = \`<svg 
role="img"><use xlink:href="/svg/cc041adc.svg#\${sel.toLowerCase()}"></use></svg>\`;
	}
	angular.element(msscope.element[0].querySelector('.ui-ms-pull-left')).html(hdr);
};

DataGridController.prototype.osFilter = function(searchTerm, cellValue, row)
{
	if(!searchTerm || !searchTerm.length)
		return true;
	return row.entity.worksOn[searchTerm];
}

DataGridController.prototype.baseVisibility = function()
{
	if(!this.fullData)
		return;
	var tabCheck;
	switch(this.\$scope.catalog.selectedTab)
	{
		case 'tab_new_releases':
			tabCheck = e=>e.new && !e.inBlacklist;
			break;
		case 'tab_upcoming':
			tabCheck = e=>e.isComingSoon && !e.inBlacklist;
			break;
		case 'tab_on_sale':
			tabCheck = e=>e.discount > 0 && !e.inBlacklist;
			break;
		case 'tab_wishlist':
			tabCheck = e=>e.inWishlist;
			break;
		case 'tab_blacklist':
			tabCheck = e=>e.inBlacklist;
			break;
		default:
			tabCheck = e=>!e.inBlacklist;
			break;
	}
	this.data = this.fullData.filter(e=>(!this.hideDLC || e.type!=3) && (!this.hideOwned || !e.owned) && tabCheck(e));
};

DataGridController.prototype.toggleCart = function(entry)
{
	if(entry.inCart)
		this.cart.remove(entry.id);
	else
	{
		this.cart.add(entry.id.toString());
		if(entry.inBlacklist) this.toggleBlacklist(entry);
	}
}

DataGridController.prototype.toggleWishlist = function(entry)
{
	if(entry.inWishlist)
	{
		this.wishlist.remove(entry.id.toString())
		if(this.\$scope.catalog.selectedTab == 'tab_wishlist')
			this.unlist(entry);
	}
	else
	{
		this.wishlist.add(entry.id.toString());
		if(entry.inBlacklist) this.toggleBlacklist(entry);
	}
}

DataGridController.prototype.toggleBlacklist = function(entry)
{
	if(entry.inBlacklist = !entry.inBlacklist)
	{
		if(entry.inWishlist) this.toggleWishlist(entry);
		if(entry.inCart) this.toggleCart(entry);
		if(this.\$scope.catalog.selectedTab != 'tab_blacklist')
			this.unlist(entry);
		this.blacklist[entry.id.toString()] = true;
		this.saveData();
		return;
	}
	delete this.blacklist[entry.id.toString()];
	this.saveData();

	if(this.\$scope.catalog.selectedTab == 'tab_blacklist')
		this.unlist(entry);
	else
		this.baseVisibility();
}

DataGridController.prototype.cartUpdate = function(data)
{
	var dataSet = new Set(data.cartContent);
	if(this.setsEqual(dataSet, this.cartSet))
		return;
	this.cartSet = dataSet;
	var refresh = false;
	if(this.fullData)
		this.fullData.forEach(e=>{
			if(e.inCart = dataSet.has(e.id))
				refresh = this.checkBlacklistRefresh(e) || refresh;
		});
	if(refresh)
		this.baseVisibility();
}

DataGridController.prototype.wishlistUpdate = function(data)
{
	var wl = isNew ? (data?.wishlistedProducts || this.wishlist.wishlistedProducts) : this.wishlist.getProducts();
	var dataSet = new Set((wl ? isNew ? wl : Object.keys(wl) : []).map(i=>parseInt(i)));
	if(this.setsEqual(dataSet, this.wishlistSet))
		return;
	this.wishlistSet = dataSet;
	var refresh = false;
	if(this.fullData)
		this.fullData.forEach(e=>{
			if(e.inWishlist = dataSet.has(e.id))
				refresh = this.checkBlacklistRefresh(e) || refresh;
			refresh = this.checkWishlistRefresh(e) || refresh;
		});
	if(refresh)
		this.baseVisibility();
}

DataGridController.prototype.ownedUpdate = function(data)
{
	var dataSet = new Set((data?.ownedProducts || []).map(id=>parseInt(id)));
	if(this.setsEqual(dataSet, this.ownedSet))
		return;
	this.ownedSet = dataSet;
	var refresh = false;
	if(this.fullData)
		this.fullData.forEach(e=>{if(!e.owned && (e.owned = dataSet.has(e.id))) refresh = true;});
	if(refresh)
		this.baseVisibility();
}


DataGridController.prototype.checkBlacklistRefresh = function(entry)
{
	if(entry.inBlacklist)
	{
		entry.inBlacklist = false;
		delete this.blacklist[entry.id.toString()];
		this.saveData();
		if(this.\$scope.catalog.selectedTab == 'tab_blacklist')
			this.unlist(entry);
		else
			return data.indexOf(entry) == -1;
	}
	return false;
}

DataGridController.prototype.checkWishlistRefresh = function(entry)
{
	if(entry.inWishlist)
	{
		if(this.\$scope.catalog.selectedTab == 'tab_wishlist')
			return data.indexOf(entry) == -1;
	}
	else if(this.\$scope.catalog.selectedTab == 'tab_wishlist')
		this.unlist(entry);
	return false;
}

DataGridController.prototype.unlist = function(entry)
{
	var idx = this.data.indexOf(entry);
	if(idx > -1)
		this.data.splice(idx, 1);
}


DataGridController.prototype.setsEqual = function(s1, s2)
{
	if(!s1 && !s2)
		return true;
	else if(!s1 || !s2)
		return false;
	for(var el of s1)
		if(!s2.has(el))
			return false;
	for(var el of s2)
		if(!s1.has(el))
			return false;
	return true;
}

DataGridController.prototype.switchChanged = function()
{
	this.saveData();
	this.baseVisibility()
};

DataGridController.prototype.toggleImages = function(\$event)
{
	this.showImages = !this.showImages;
	this.grid.getColumn('title').menuItems[0].icon = !this.showImages ? 'ui-grid-icon-blank' : 'ui-grid-icon-ok';
	this.saveData();
	this.baseVisibility();
};


DataGridController.prototype.expandSaveData = function()
{
	if(this.fullData)
		this.saveData();
};

DataGridController.prototype.saveData = function()
{
	if(this.restoring)
		return;
	for(let c of this.grid.columns)
	{
		if(c.filters)
			storage.set(c.name+'_filter', c.filters.map(f=>f.term));
		storage.set(c.name+'_width', c.width);
		storage.set(c.name+'_vis', c.visible);
		storage.set(c.name+'_sort', c.sort);
	}
	storage.set('expanded', (isNew ?  this.\$scope.cat_expanded : this.\$scope.\$parent.cat_expanded) || false);
	storage.set('hideOwned', this.hideOwned || false);
	storage.set('hideDLC', this.hideDLC || false);
	storage.set('showImages', this.showImages || false);
	storage.set('blacklist', this.blacklist);
	storage.save();
};

DataGridController.prototype.restoreData = function(fromFile)
{
	this.restoring = true;
	if(!fromFile)
		storage.restore();
	let v;
	for(let c of this.grid.columns)
	{
		c.colDef.origWidth = c.colDef.width;
		let i = 0;
		for(let ft of storage.get(c.name+'_filter') || [])
			if(c.filters[i])
				c.filters[i++].term = ft;
		if((v = storage.get(c.name+'_vis')) !== undefined)
			if(v)
				c.showColumn();
			else
				c.hideColumn();
		if((v = storage.get(c.name+'_width')) !== undefined)
			c.colDef.width = c.width = !c.colDef.minWidth ? v : Math.max(v, c.colDef.minWidth);
		if((v = storage.get(c.name+'_sort')) !== undefined)
			c.sort = v;
	}
	var exp = storage.get('expanded');
	if(isNew)
		this.\$scope.cat_expanded = exp;
	else
		this.\$scope.\$parent.cat_expanded = exp;
	if(exp)
		this.grid.refreshCanvas();
	this.hideOwned = storage.get('hideOwned') || false;
	this.hideDLC = storage.get('hideDLC') || false;
	if((v = storage.get('showImages')) !== undefined && v !== this.showImages)
		this.toggleImages();
	this.blacklist = storage.get('blacklist') || {};
	this.restoring = false;
};

DataGridController.prototype.saveToFile = function()
{
	this.saveData();
    var file = new Blob([JSON.stringify(storage.data)], {type: 'application/json'});
    download.href = URL.createObjectURL(file);
    download.download = 'GOG datagrid configuration.json';
	download.click();
};

DataGridController.prototype.restoreFromFile = function()
{
	upload.onchange = this.restorePart1.bind(this);
	upload.click();
};

DataGridController.prototype.restorePart1 = function()
{
	if(!upload.files || !upload.files.length || !upload.files[0])
		return;
	var fr = new FileReader();
	fr.onload = this.restorePart2.bind(this);
	fr.readAsText(upload.files[0]);
};

DataGridController.prototype.restorePart2 = function(e)
{
	var text = e.target.result;
	var parsed;
	try
	{
		parsed = JSON.parse(text);
	}
	catch(ex)
	{
		return alert('This is not a valid JSON file.');
	}

	try
	{
		let data = {};
		let key, val;

		if(typeof parsed !== 'object' || Array.isArray(parsed))
			throw new Error('not an object');

		for(let c of this.grid.columns)
		{
			if(val = parsed[key = c.name+'_filter'])
				if(!Array.isArray(val) || val.length < 1)
					throw new Error('wrong filter for '+c.name);
				else
				{	
					if(c.name === 'genre')
					{
						for(let subval of val)
							if(typeof subval !== 'object' ||
								!Array.isArray(subval.options) ||
								subval.options.filter(o=>typeof(o) !== 'string').length ||
								typeof subval.mode?.and !== 'boolean')
								throw new Error('wrong subfilter for '+c.name);
					}
					else
						for(let subval of val)
							if(subval != null && typeof subval !== 'string')
								throw new Error('wrong subfilter for '+c.name);
					data[key] = val;
				}
			if(val = parsed[key = c.name+'_width'])
			{
				if(val !== '*' && typeof val !== 'number')
					throw new Error('wrong width for '+c.name);
				data[key] = val;
			}
			if(val = parsed[key = c.name+'_sort'])
			{
				if(typeof val !== 'object' ||
					(Object.keys(val).length > 0 &&
						(typeof val.priority !== 'number' ||
						(val.direction !== 'asc' && val.direction !== 'desc'))))
					throw new Error('wrong sort for '+c.name);
				data[key] = val;
			}
			if((val = parsed[key = c.name+'_vis']) !== undefined)
			{
				if(typeof val !== 'boolean')
					throw new Error('wrong vis for '+c.name);
				data[key] = val;
			}
		}
		for(key of ['expanded','hideOwned','hideDLC','showImages'])
			if((val = parsed[key]) !== undefined)
				if(typeof val !== 'boolean')
					throw new Error('wrong value for '+key);
				else
					data[key] = val;
		if(val = parsed[key = 'blacklist'])
			if(typeof val !== 'object')
				throw new Error('wrong blacklist');
			else
			{
				for(let subkey in val)
					if(parseInt(subkey) == NaN || val[subkey] !== true)
						throw new Error('wrong blacklist entry');
				data[key] = val;
			}
		for(key in data)
			storage.set(key, data[key]);

		this.restoreData(true);
		for(let entry of this.fullData)
			entry.inBlacklist = !entry.inWishlist && !entry.inCart && this.blacklist[entry.id.toString()];
		this.baseVisibility();
		this.grid.refresh();
	}
	catch(ex)
	{
		return alert('This is not a valid grid configuration file: '+ex.message);
	}
	alert('Configuration restored.');
};



startDatagrid = function(\$scope)
{
	\$scope.viewSwitcher.activeView = 'datagrid';
	dgCont.start();
};

var mainMod = !isNew ? 'gog' : 'menuCompanion';

angular.module(mainMod).controller('DataGridController', ['\$scope', '\$http', '\$window', '\$compile', 'cart', !isNew ? 'wishlist' : 'menuWislistClient', DataGridController]);
angular.module(mainMod).requires.push('ui.grid');
angular.module(mainMod).requires.push('ui.grid.autoResize');
angular.module(mainMod).requires.push('ui.grid.resizeColumns');
angular.module(mainMod).requires.push('ui.multiselect');

if(isNew)
{
	angular.element(document.querySelector('[ng-app]')).attr("ng-controller", "DataGridController as dg");
}



// waterfox/old ff
if(!Array.prototype.flat)
	Array.prototype.flat = function() { return Array.concat.apply(Array, this); }

// about menu
angular.element(document.querySelector("div[hook-test='menuAbout'] .js-menu")).append('<div class="menu-submenu-item menu-submenu-item--hover"><a href="https://github.com/ghorint2t/scripts" class="menu-submenu-link" target="_blank">Games data grid view</a></div>');

`;

var gridctrlcss = `
.datagrid { width:300px;height:auto; margin-bottom: 5px;font-size:0.8em; }
.dg-option { display: inline-block; margin-right:1em; cursor: pointer; }
.dg-check { font-style: normal; display: inline-block; width: 1em; height: 1em; border: 1px solid; position: relative; top: 0.2em; margin-right: 0.2em; box-sizing: content-box;}
.dg-checked::before {font-family:'gog-icons';content:'\\e60c';font-size:0.7em;position:absolute;padding-left:0.15em;}
.dg-stat { display: inline-block; float:right; }
.ui-grid-icon-angle-down::before { font-family:'gog-icons';content:'\\f078';font-size:0.5em;}
.ui-grid-icon-up-dir::before { font-family:'gog-icons';content:'\\e007';}
.ui-grid-icon-down-dir::before { font-family:'gog-icons';content:'\\e005';}
.ui-grid-icon-sort-alt-up::before { font-family:'gog-icons';content:'\\e007';}
.ui-grid-icon-sort-alt-down::before { font-family:'gog-icons';content:'\\e005';}
.ui-grid-icon-cancel::before { font-family:'gog-icons';content:'\\f00d';}
.ui-grid-icon-ok::before { font-family:'gog-icons';content:'\\e60c';font-size:0.7em;}
.ui-grid-icon-menu::before { font-family:'gog-icons';content:'\\e018';}
.ui-grid-row { fill: #212121; }
.ui-grid-filter-input { font-size: 0.9em; }
.ui-grid-filter-container .ui-grid-filter-button [class^="ui-grid-icon"] { margin-top: -15px; right: 2px; }
input[type="text"].ui-grid-filter-input { padding-right: 14px; }
.ui-grid-filter-container { padding: 2px 4px; }
.datagrid-owned-row { color: #999; fill: #999}
.datagrid-cart-row { color: #7fab34; fill: #7fab34}
.datagrid-wl-row { color: #ffa200; fill: #ffa200}
.datagrid-bl-row { color: #116; }
.datagrid-title > a { display:flex;flex-direction:row;height:100%; }
.datagrid-title > a > img { height:100%;margin-right:5px; }
.datagrid-title > a.dlc { font-style:italic; }
.datagrid-title-mod { display:inline-block;position:relative;padding:0.2em 0.4em;font-size:0.6em;top:0.5em;line-height:1;margin-left:0.6em;border-radius:3px;height:1em;box-sizing:content-box;}
.datagrid-title-mod.soon { background:#094a77; color:#fff;}
.datagrid-title-mod.indev { background:#e9cbae; color:#543200;}
.datagrid-title-mod.new { color:#ff4000;font-style:italic;font-size:0.7em;top:0.45em;}
.datagrid-devpub { font-size:0.75em;padding-top:1px; }
.datagrid-rank { text-align: right; }
.datagrid-year { text-align: right; }
.datagrid-os > svg { width: 13px; height: 13px; margin: 3px 0px;}
.datagrid-rating { text-align: center; font-size:0.75em; font-weight:bold; padding-top:1px; }
.datagrid-norating { text-align: center; }
.datagrid-rating > span { font-family:'gog-icons'; font-weight: normal;}
.datagrid-genre { font-size:0.75em; padding-top:1px; padding-bottom: 1px;word-wrap:normal; white-space:normal;vertical-align:middle; display:flex; flex-direction:column; }
.datagrid-genre > div { flex:1; }
.datagrid-genre > span { flex:0; }
.datagrid-discount { text-align: right; }
.datagrid-discount > div > span,.datagrid-discount > div > a { font-size: 0.8em !important; padding: 4px 5px !important;}
.datagrid-price { display: flex; flex-direction: row; }
.datagrid-price > div { flex: 1; display: flex; flex-direction: column}
.datagrid-price > div > div { flex: 1; }
.datagrid-price > div > span, .datagrid-price > span { flex: 0; text-align: right; display:block; margin: 0px; padding: 0px}
.datagrid-price > div > span.bp { font-size: 0.7em !important; color: #999; font-weight: 600; text-decoration: line-through; }
.datagrid-price > div > span.bon { font-size: 0.6em !important; color: #739900; margin-bottom: -3px; }
.datagrid-price > span { font-weight: 700; font-size: 1.3em; margin-left: 5px; }
.datagrid-price > span.free { font-size: 1em !important; }
.datagrid-cart { padding:1px; width:100%; }
.datagrid-cart > div { display: inline-block; height: calc(1.4em + 2px); width: 1.5em; position:relative; left: 0.2em; padding: 0; }
.datagrid-cart button.wl { display: none; border: 1px solid transparent; width: 1.5em; height: 1.4em; padding: 0.1em 0.3em; margin-top: 0.4em; cursor: pointer; background: transparent; }
.datagrid-cart button.wl > i { font-style: normal; font-family: 'gog-icons'; }
.datagrid-cart button.wl > i::before { content:'\\e600'; }
.datagrid-cart.wl button.wl > i::before { content:'\\e60a';color:#ffa200; }
.datagrid-cart button.bl { display: none; border: 1px solid transparent; width: 1.5em; height: 1.4em; padding: 0.1em 0.45em 0.1em 0.15em; margin-top: 0.4em; cursor: pointer; background: transparent; color:#444;}
.datagrid-cart button.bl > i { font-style: normal; font-family: 'gog-icons'; }
.datagrid-cart button.bl > i::before { content:'\\e00a'; }
.datagrid-cart button.bl:hover { color:#116; }
.datagrid-cart.bl button.bl > i::before { color:#116; }
.datagrid-cart button.cart { display: none; border: 1px solid #7fab34; border-radius: 3px; width: 1.5em; height: 1.4em; padding: 0.1em 0.3em; margin-top: 0.4em;cursor: pointer; background-image: linear-gradient(180deg,#a5c700,#86b300); box-shadow: 0 1px 2px 0 rgba(0,0,0,.35); transition: .2s; fill: #fff; }
.datagrid-cart button.cart:hover { background-image: linear-gradient(180deg,#acce00,#8bba00); }
.datagrid-cart button.cart > svg { width: 1em; height: 1em; }
.ui-grid-row:hover .datagrid-cart button, .datagrid-cart.cart button.cart, .datagrid-cart.wl button.wl, .datagrid-cart.bl button.bl { display: inline-block; }
.ui-ms-icon-ok::before { font-family:'gog-icons';content:'\\e60c';font-size:0.7em;}
.ui-ms-icon-remove::before { font-family:'gog-icons';content:'\\f00d';}
.datagrid-ms { font-size: 0.9em; width:calc(100% - 12px); }
.datagrid-ms svg { width: 1em; height: 1em; margin: 0; margin-top: 0.15em; margin-bottom: -0.25em;}
.expand_button { width:16px; height:14px; fill:#595959; position:absolute; right:-20px; bottom:-7px; z-index:25; cursor:pointer;}
.expand_button:hover { fill: #78387b; }
.catalog-expanded {max-width:initial !important; padding-left:20px !important; padding-right: 20px !important;}
.dg-btn {padding: 0em 0.8em; display:inline-block; margin-right: 1em; text-transform:none; margin-bottom:0.5em; font-size:1em;position: relative;height: 36px;line-height: 36px;text-align: center;border-radius: 3px;cursor: pointer;user-select: none;box-shadow: 0 0 0 1px rgba(0,0,0,.25),0 1px 3px rgba(0,0,0,.3);font-weight: 600;border: none;}
.dg-btn > span {font-size:1.2em;padding: 0 0.3em 0 0;margin-left: -0.2em;}
.dg-download {display:none;}
.dg-upload {display:none;}
.dg-tab-sep {border-left: 1.5px solid #bfbfbf;height: 75%;width: 0;margin: 0 20px 0 -10px;cursor:default;}
.datagrid-icon {
mask:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDQwIDQwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0Ij4KCQk8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNiI+PC9yZWN0PgoJCTxyZWN0IHg9IjAiIHk9IjM0IiB3aWR0aD0iNDAiIGhlaWdodD0iNiI+PC9yZWN0PgoJCTxyZWN0IHg9IjAiIHk9IjE0IiB3aWR0aD0iNDAiIGhlaWdodD0iNiI+PC9yZWN0PgoJCTxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSI2IiBoZWlnaHQ9IjQwIj48L3JlY3Q+CgkJPHJlY3QgeD0iMzQiIHk9IjAiIHdpZHRoPSI2IiBoZWlnaHQ9IjQwIj48L3JlY3Q+CgkJPHJlY3QgeD0iMTMiIHk9IjAiIHdpZHRoPSI0IiBoZWlnaHQ9IjQwIj48L3JlY3Q+CgkJPHJlY3QgeD0iMjQiIHk9IjAiIHdpZHRoPSI0IiBoZWlnaHQ9IjQwIj48L3JlY3Q+CgkJPC9zdmc+");
-webkit-mask:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDQwIDQwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0Ij4KCQk8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNiI+PC9yZWN0PgoJCTxyZWN0IHg9IjAiIHk9IjM0IiB3aWR0aD0iNDAiIGhlaWdodD0iNiI+PC9yZWN0PgoJCTxyZWN0IHg9IjAiIHk9IjE0IiB3aWR0aD0iNDAiIGhlaWdodD0iNiI+PC9yZWN0PgoJCTxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSI2IiBoZWlnaHQ9IjQwIj48L3JlY3Q+CgkJPHJlY3QgeD0iMzQiIHk9IjAiIHdpZHRoPSI2IiBoZWlnaHQ9IjQwIj48L3JlY3Q+CgkJPHJlY3QgeD0iMTMiIHk9IjAiIHdpZHRoPSI0IiBoZWlnaHQ9IjQwIj48L3JlY3Q+CgkJPHJlY3QgeD0iMjQiIHk9IjAiIHdpZHRoPSI0IiBoZWlnaHQ9IjQwIj48L3JlY3Q+CgkJPC9zdmc+");
mask-repeat:no-repeat;-webkit-mask-repeat:no-repeat;}
#datagridview {font-size:16px;}
#datagridview a { text-decoration: none; color: inherit; outline: none; }
#datagridview .product-tile__discount { margin-right: 8px; border-radius: 2px; background: #6d1d72; color: #fff; font-weight: 700; line-height: 12px; }
.dg-tabs {text-align: center; display: block; width: 100%; font-size: 16px; position: relative; height: 0; z-index: 15;}
.dg-tabs .tabs-row-option {display: inline-block; height: 100%; margin-right: 30px; cursor: pointer; position: relative; top: 15px;margin-top: -8px; padding-top: 8px;}
.dg-tabs .tabs-row-option--selected {border-top: 3px solid #78387b; color: #78387b;}
.dg-header {margin-bottom:0 !important;}
.dg-tabs .dg-tab-sep {height: 2em !important; width: 0; margin: -8px 20px 8px -10px !important; cursor: default !important; top: 18px !important; }

`;

new MutationObserver(function(mlist, ob)
{
    for(let mut of mlist)
    for(let n of mut.addedNodes)
    {
		let isNew = false;
        if(n.nodeName == 'SCRIPT' && n.getAttribute('src') && 
			((isNew = n.getAttribute('src').match('main-es2015')) || 
			n.getAttribute('src').match('jsGlobal')))
        {
            n.addEventListener("load", function()
            {
				try
				{
					unsafeWindow.eval(uigrid+uims+gridctrl);
				}
				catch(e)
				{
					unsafeWindow.console.error(e);
				}
				GM_addStyle(uigridcss);
				GM_addStyle(uimscss);
				GM_addStyle(gridctrlcss);
            }, false);
			if(!isNew)
				ob.disconnect();
        }
		else if(n.querySelector && n.querySelector('.icon-grid'))
		{
			if(unsafeWindow.installGrid)
			{
				try
				{
					unsafeWindow.installGrid();
				}
				catch(e)
				{
					unsafeWindow.console.error(e);
				}
                ob.disconnect();
				return;
			}
		}
	}
}).observe(document,{ attributes: true, childList: true, subtree: true });
