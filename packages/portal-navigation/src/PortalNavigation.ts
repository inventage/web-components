import {
  baseStyles,
  CSSResultArray,
  html,
  LitElement,
  Nothing,
  nothing,
  property,
  state,
  TemplateResult,
  query,
  ClassInfo,
  classMap,
  PropertyValues,
  ifDefined,
} from '@inventage-web-components/common';
import { ScopedElementsMap, ScopedElementsMixin } from '@open-wc/scoped-elements';
import { HamburgerMenu } from '@inventage-web-components/hamburger-menu';
import { debounce } from 'ts-debounce';
import { IdPath } from './IdPath.js';
import { CommonMenuItem, Configuration, FirstLevelMenuItem, MenuItem, MenuLabel } from './Configuration.js';
import { styles } from './styles-css.js';

/**
 * A listing of key menu ids that are handled specifically by the portal navigation component.
 */
const NavigationMenus = {
  /**
   * The 'main' menu's items will be displayed in the second row.
   */
  main: 'main',

  /**
   * The 'settings' menu's items will be displayed next to the 'main' menu's items (to the right).
   */
  settings: 'settings',

  /**
   * The 'meta' menu's items will be displayed in the top row on the left of 'profile' menu.
   */
  meta: 'meta',

  /**
   * The 'profile' menu's items will be displayed in the top row on the left of 'logout' menu.
   */
  profile: 'profile',

  /**
   * The 'logout' menu's items will be displayed in the top row on the very right.
   */
  logout: 'logout',
} as const;

export type NavigationMenuType = typeof NavigationMenus;
export type NavigationMenuName = keyof typeof NavigationMenus;

const NavigationEventNamespace = 'portal-navigation';

/**
 * List of events this component throws
 */
export const NavigationEvents = {
  routeTo: `${NavigationEventNamespace}.routeTo`,
  setLanguage: `${NavigationEventNamespace}.setLanguage`,
  configured: `${NavigationEventNamespace}.configured`,
  breakpointChanged: `${NavigationEventNamespace}.breakpointChanged`,
  firstUpdated: `${NavigationEventNamespace}.firstUpdated`,
  hamburgerMenuExpanded: `${NavigationEventNamespace}.hamburgerMenuExpanded`,
} as const;

/**
 * List of events this component listens to
 */
export const NavigationEventListeners = {
  setBadgeValue: `${NavigationEventNamespace}.setBadgeValue`,
  setActiveUrl: `${NavigationEventNamespace}.setActiveUrl`,
} as const;

const NavigationCssClasses = {
  selected: '-selected',
  expanded: '-expanded',
} as const;

type NavigationCssClasses = typeof NavigationCssClasses;

// TODO: kebab-cased attributes

/**
 * A component implementing an opinionated (but generic and hence configurable) navigation pattern.
 *
 * @fires portal-navigation.firstUpdated - Event fired when the component has been rendered for the first time.
 * @fires portal-navigation.configured - Event fired when the configuration has been successfully loaded.
 * @fires portal-navigation.routeTo - Event fired when an item with a url is clicked and the routing is done internally.
 * @fires portal-navigation.setLanguage - Event fired when the 'lang' property changes.
 * @fires portal-navigation.breakpointChanged - Event fired when the mobile breakpoint media query state changes.
 *
 * @listens 'portal-navigation.setBadgeValue' - Listens to event that change the badge value of an item or menu and sets that value accordingly.
 * @listens 'portal-navigation.setActiveUrl' - Listens to event that change the active menu item.
 *
 * @cssprop {color} [--portal-navigation-color-primary=#555] Primary color used for text elements
 * @cssprop {color} [--portal-navigation-color-secondary=rgb(10, 81, 194)] Secondary color used for highlights
 * @cssprop {color} [--portal-navigation-color-link=var(--portal-navigation-color-primary)] Color used for links
 * @cssprop {color} [--portal-navigation-color-link-breakpoint=var(--portal-navigation-color-primary)] Color used for links in mobile breakpoint
 * @cssprop {color} [--portal-navigation-color-link-dropdown=var(--portal-navigation-color-primary)] Color used for links in dropdowns
 * @cssprop {color} [--portal-navigation-color-link-current=var(--portal-navigation-color-link)] Color used for links in current items
 * @cssprop {color} [--portal-navigation-color-selected=var(--portal-navigation-color-secondary)] Color used for selected elements
 * @cssprop {color} [--portal-navigation-color-hover=var(--portal-navigation-color-secondary)] Hover color
 * @cssprop {color} [--portal-navigation-color-hover-dropdown=var(--portal-navigation-color-hover)] Hover color in dropdowns
 * @cssprop {color} [--portal-navigation-color-hover-current=var(--portal-navigation-color-hover)] Hover color for current elements
 * @cssprop {color} [--portal-navigation-color-badge=white] Badge color
 * @cssprop {color} [--portal-navigation-color-badge-background=var(--portal-navigation-color-secondary)] Badge background color
 * @cssprop {color} [--portal-navigation-color-dropdown-background=white] Dropdown background color
 * @cssprop {color} [--portal-navigation-color-border=rgba(44, 62, 80, 0.1)] Default border color
 * @cssprop {color} [--portal-navigation-color-header-background=#eef3fe] Header element background color
 * @cssprop {color} [--portal-navigation-color-meta-bar-background=#dbe7fd] Meta bar element background color
 * @cssprop {color} [--portal-navigation-color-main-background=var(--portal-navigation-color-header-background)] Main element background color
 * @cssprop {color} [--portal-navigation-color-current-background=#fff] Current element background color (element that holds the 2nd level navigation)
 *
 * @cssprop [--portal-navigation-tree-parent-border-top=none] Tree item parent border top
 * @cssprop [--portal-navigation-tree-parent-border-bottom=solid 1px var(--portal-navigation-color-border, rgba(44, 62, 80, 0.1))] Tree item parent border bottom
 *
 * @cssprop {length} [--portal-navigation-font-size=1.25rem] Default font size
 * @cssprop {length} [--portal-navigation-font-size-badge=1rem] Font size for badges
 * @cssprop {length} [--portal-navigation-font-size-tree-second-level=1rem] Font size for tree 2nd level items (mobile breakpoint)
 * @cssprop [--portal-navigation-font-family=sans-serif] Default font family
 *
 * @cssprop {length} [--portal-navigation-horizontal-base=1rem] Horizontal base unit
 * @cssprop {length} [--portal-navigation-vertical-base=0.5rem] Vertical base unit
 * @cssprop {length} [--portal-navigation-menu-item-padding-x=0] Menu item horizontal padding
 * @cssprop {length} [--portal-navigation-menu-item-padding-y=0.5rem] Menu item vertical padding
 * @cssprop {length} [--portal-navigation-menu-item-icon-label-spacing=0.25rem] Menu item spacing between the icon and label
 * @cssprop {length} [--portal-navigation-menu-item-spacing=var(--portal-navigation-horizontal-base)] Spacing between menu items
 * @cssprop {length} [--portal-navigation-header-menu-spacing=2rem] Spacing of menus (meta, profile, logout) in the navigation header.
 *
 * @cssprop {length} [--portal-navigation-dropdown-item-padding-x=0.5rem] Dropdown item horizontal padding
 * @cssprop {length} [--portal-navigation-dropdown-item-padding-y=1rem] Dropdown item vertical padding
 * @cssprop {length} [--portal-navigation-tree-parent-padding-x=var(--portal-navigation-horizontal-base)] Horizontal padding of parent items in the tree (mobile breakpoint)
 * @cssprop {length} [--portal-navigation-tree-parent-padding-y=var(--portal-navigation-menu-item-padding-y)] Vertical padding of parent items in the tree (mobile breakpoint)
 * @cssprop {length} [--portal-navigation-tree-items-margin-y=var(--portal-navigation-vertical-base)] Vertical margin of parent items in the tree (mobile breakpoint)
 * @cssprop {length} [--portal-navigation-tree-items-link-padding-x=var(--portal-navigation-horizontal-base)] Horizontal padding of links in parent items in the tree (mobile breakpoint)
 * @cssprop {length} [--portal-navigation-tree-items-link-padding-y=var(--portal-navigation-menu-item-padding-y)] Vertical padding of links in parent items in the tree (mobile breakpoint)
 *
 * @cssprop {length} [--portal-navigation-max-width=1200px] Maximum (container) width of the navigation
 *
 * @cssprop [--portal-navigation-main-justify-content=flex-end] Horizontal centering of the items in the main menu (container)
 * @cssprop [--portal-navigation-current-justify-content=flex-end] Horizontal centering of the items in the current menu (container)
 * @cssprop [--portal-navigation-current-slot-order=0] Order of the element holding the current slot

 * @cssprop [--portal-navigation-menu-item-white-space=nowrap] Menu item white space wrap
 * @cssprop [--portal-navigation-z-index-sticky=100] z-index for when navigation is sticky
 *
 * @csspart slot-header-mobile - Slot element wrapper between the hamburger menu element and the logo slot
 * @csspart slot-meta-left - Slot element wrapper for the left part of the meta bar
 * @csspart slot-meta-right - Slot element wrapper for the right part of the meta bar
 * @csspart slot-header-mobile - Slot element wrapper between the hamburger menu element and the logo slot
 * @csspart slot-logo - Slot element wrapper for the logo slot
 * @csspart slot-left - Slot element wrapper for the left slot
 * @csspart slot-right - Slot element wrapper for the right slot
 * @csspart slot-current - Slot element wrapper for the current slot
 * @csspart container - The top-level, container element wrapping everything inside the host element
 * @csspart hamburger-menu - The hamburger menu element (shown in mobile breakpoint)
 * @csspart menu-main - Element wrapper for the main menu items (1st level)
 * @csspart meta-bar - Element wrapper for the meta bar
 * @csspart navigation-header - Element wrapper for the navigation header
 * @csspart main - Element wrapper for the main navigation area / container
 * @csspart current - Element wrapper for the current items (2nd level) container
 * @csspart tree-container - Element wrapper for the tree items container (mobile breakpoint)
 * @csspart navigation-header-container - Element for the navigation header in mobile breakpoint
 *
 * @slot logo - The slot for the logo
 * @slot right - The right slot
 * @slot left - The left slot
 * @slot meta-left - The left slot inside the meta bar
 * @slot meta-right - The right slot inside the meta bar
 * @slot header-mobile - The slot rendered in the top bar in the mobile breakpoint
 * @slot tree-bottom - The slot rendered at the bottom of the menu tree (mobile breakpoint)
 * @slot current - The slot rendered next to the current items (2nd level), in non-mobile variant only
 */
export class PortalNavigation extends ScopedElementsMixin(LitElement) {
  /**
   * Location from where to fetch configuration data file.
   */
  @property()
  src?: string;

  /**
   * The current language. e.g. 'en' or 'de'.
   */
  @property()
  language = 'en';

  /**
   * You can use this to set the active path via the url of an item.
   */
  @property()
  activeUrl?: string;

  /**
   * The current application. Items change their routing behavior based on whether their application property matches this property or not.
   *
   * @property {string}
   */
  @property()
  currentApplication?: string;

  /**
   * True if items, by default, should route internally. Items may override this default in their own configuration. Default is false.
   */
  @property({ type: Boolean })
  internalRouting = false;

  /**
   * Controls whether the logout menu will be displayed in the meta bar.
   */
  @property({ type: Boolean })
  logoutMenuInMetaBar = false;

  /**
   * Controls whether the logout menu will be displayed in the mobile header bar (in mobile breakpoint).
   */
  @property({ type: Boolean })
  logoutMenuInMobileHeader = false;

  /**
   * Viewport width at which navigation switches from/to the mobile breakpoint.
   */
  @property({ type: Number })
  mobileBreakpoint = 800;

  /**
   * Whether the navigation is in mobile breakpoint. This property is being reflected back to its attribute.
   */
  @property({
    type: Boolean,
    reflect: true,
  })
  isMobileBreakpoint = false;

  /**
   * Whether the hamburger menu is expanded. This property is being reflected back to its attribute.
   */
  @property({
    type: Boolean,
    reflect: true,
  })
  hamburgerMenuExpanded = false;

  /**
   * Controls whether the navigation should be "sticky" (on the top of the "anchor")
   * The anchor element should have a "position: relative;" for the sticky position to work.
   */
  @property({ type: Boolean })
  sticky = false;

  /**
   * Selector of the anchor navigation should "anchor" to when sticky.
   * This selector is fed to querySelectorAll().
   * If the navigation is not sticky. this will have no effect.
   */
  @property()
  anchor?: string;

  /**
   * The current path of "active" items. e.g. if an item in level 2 is clicked it's parent item and the corresponding menu would be considered "active"
   *
   * @private
   */
  @state()
  private activePath = new IdPath();

  @state()
  private activeDropdown?: string;

  @query('.container')
  private container?: HTMLDivElement;

  private temporaryBadgeValues = new Map();

  private configuration = new Configuration();

  private anchorElement?: HTMLElement;

  private initialAnchorElementPadding?: string;

  static get scopedElements(): ScopedElementsMap {
    return {
      'hamburger-menu': HamburgerMenu,
    };
  }

  static get styles(): CSSResultArray {
    return [baseStyles, styles];
  }

  /**
   * A listing of key menu ids that are handled specifically by the portal navigation component.
   */
  static get menuIds(): NavigationMenuType {
    return NavigationMenus;
  }

  /**
   * A specifically handled menu ids in the order they will be displayed in the hamburger menu.
   */
  static get menuIdsOrdered(): NavigationMenuName[] {
    return Object.values(PortalNavigation.menuIds);
  }

  /**
   * A listing of css classes that are frequently used in a generic manner.
   */
  static get classes(): NavigationCssClasses {
    return NavigationCssClasses;
  }

  constructor() {
    super();

    // Make sure global (document / window) listeners are bound to `this`, otherwise we cannot properly remove them
    // @see https://open-wc.org/faq/events.html#on-elements-outside-of-your-element
    this.__setBadgeValueEventListener = this.__setBadgeValueEventListener.bind(this);
    this.__setActiveUrlEventListener = this.__setActiveUrlEventListener.bind(this);
    this.__globalClickListener = this.__globalClickListener.bind(this);

    // Always debounce anchor padding updates
    this.updateAnchorPaddingWhenSticky = debounce(this.updateAnchorPaddingWhenSticky, 100).bind(this);
  }

  connectedCallback(): void {
    super.connectedCallback && super.connectedCallback();

    if (this.src) {
      this.__fetchRemoteData();
    }

    // Parse URL when connected, only if activeUrl has not been set
    const parsedUrl = new URL(window.location.href);
    if (!this.activeUrl && parsedUrl && parsedUrl.pathname && parsedUrl.pathname !== '/') {
      const { pathname } = parsedUrl;
      this.activeUrl = pathname;
    }

    // Detect whether we have an anchor element
    // Currently, we only set the anchor element once (when element is connected to the DOM)
    this.anchorElement = this.getElementForAnchor();

    // Register global listeners
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.addEventListener(NavigationEventListeners.setBadgeValue, this.__setBadgeValueEventListener);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.addEventListener(NavigationEventListeners.setActiveUrl, this.__setActiveUrlEventListener);
    document.addEventListener('click', this.__globalClickListener);
    window.addEventListener('resize', this.updateAnchorPaddingWhenSticky);
  }

  disconnectedCallback(): void {
    // Remove existing global listeners
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.removeEventListener(NavigationEventListeners.setBadgeValue, this.__setBadgeValueEventListener);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.removeEventListener(NavigationEventListeners.setActiveUrl, this.__setActiveUrlEventListener);
    document.removeEventListener('click', this.__globalClickListener);
    window.removeEventListener('resize', this.updateAnchorPaddingWhenSticky);

    super.disconnectedCallback && super.disconnectedCallback();
  }

  firstUpdated(): void {
    this.dispatchEvent(new CustomEvent(NavigationEvents.firstUpdated, { detail: this }));

    // Listen for mobile breakpoint changes
    const mql = window.matchMedia(`screen and (max-width: ${this.mobileBreakpoint}px)`);
    this.isMobileBreakpoint = mql.matches;
    // @see https://github.com/microsoft/TypeScript/issues/32210#issuecomment-701374495
    if (mql.addEventListener) {
      mql.addEventListener('change', e => {
        this.isMobileBreakpoint = e.matches;
      });
    } else {
      // Deprecated 'MediaQueryList' API, <Safari 14, IE, <Edge 16
      // noinspection JSDeprecatedSymbols
      mql.addListener(e => {
        this.isMobileBreakpoint = e.matches;
      });
    }
  }

  updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('language')) {
      this.dispatchEvent(new CustomEvent(NavigationEvents.setLanguage, { detail: this.language, composed: true, bubbles: true }));
    }

    if (changedProperties.has('activeUrl')) {
      this.__updateActivePathFromUrl();
    }

    // Restore initial anchor element padding, since at this point, it has been changed by us
    if (changedProperties.has('sticky') && !this.sticky && this.anchorElement && this.initialAnchorElementPadding !== undefined) {
      this.anchorElement.style.paddingTop = this.initialAnchorElementPadding;
      this.initialAnchorElementPadding = undefined;
    }

    if (changedProperties.has('hamburgerMenuExpanded')) {
      this.dispatchEvent(new CustomEvent(NavigationEvents.hamburgerMenuExpanded, { detail: this.hamburgerMenuExpanded, composed: true, bubbles: true }));

      // Prevent anchor overflowing in mobile when navigation is sticky + open
      if (this.sticky && this.anchorElement && this.mobileBreakpoint) {
        this.anchorElement.style.overflowY = this.hamburgerMenuExpanded ? 'hidden' : 'visible';
      }
    }

    if (changedProperties.has('isMobileBreakpoint')) {
      this.dispatchEvent(new CustomEvent(NavigationEvents.breakpointChanged, { detail: this.isMobileBreakpoint, composed: true, bubbles: true }));
    }

    this.updateAnchorPaddingWhenSticky();
  }

  render(): TemplateResult | Nothing {
    if (!this.src) {
      return nothing;
    }

    const menuMeta = this._createMenuTemplate(PortalNavigation.menuIds.meta);
    const menuProfile = this._createMenuTemplate(PortalNavigation.menuIds.profile);
    const menuLogout = this._createMenuTemplate(PortalNavigation.menuIds.logout);
    const menuMain = this._createMenuTemplate(PortalNavigation.menuIds.main);
    const menuSettings = this._createMenuTemplate(PortalNavigation.menuIds.settings);
    const currentItems = this._createCurrentItemsTemplate();
    const mainMenusEmpty = menuMain === nothing && menuSettings === nothing;

    /**
     * The list of header menus, filtered by whether they actually render a menu (whether a menu has items or not)
     * so we can iterate over it and add additional classes for styling.
     */
    const headerMenus = [
      (classInfo: ClassInfo = {}) =>
        !this.isMobileBreakpoint && menuMeta !== nothing ? html` <div class="menu-meta menu ${classMap(classInfo)}">${menuMeta}</div>` : nothing,
      (classInfo: ClassInfo = {}) =>
        !this.isMobileBreakpoint && menuProfile !== nothing ? html` <div class="menu-profile menu ${classMap(classInfo)}">${menuProfile}</div>` : nothing,
      (classInfo: ClassInfo = {}) =>
        menuLogout !== nothing && ((this.isMobileBreakpoint && this.logoutMenuInMobileHeader) || (!this.isMobileBreakpoint && !this.logoutMenuInMetaBar))
          ? html` <div class="menu-logout menu ${classMap(classInfo)}">${menuLogout}</div>`
          : nothing,
    ].filter(menuTemplate => menuTemplate() !== nothing);

    return html` <div
      class="container ${classMap({
        '-mobile': this.isMobileBreakpoint,
        '-open': this.hamburgerMenuExpanded,
        '-sticky': this.sticky,
        '-empty': mainMenusEmpty,
      })}"
      part="container"
    >
      ${!this.isMobileBreakpoint ? this.renderMetaBar(menuLogout) : nothing}

      <header class="navigation-header" part="navigation-header">
        <div class="container-max-width inner navigation-header-inner" part="navigation-header-container">
          <div class="slot-logo" part="slot-logo">
            <slot name="logo"></slot>
          </div>
          <div class="slot-left" part="slot-left">
            <slot name="left"></slot>
          </div>
          <div class="slot-header-mobile" part="slot-header-mobile">
            <slot name="header-mobile"></slot>
          </div>
          ${headerMenus.map((menuTemplate, index) => menuTemplate({ item: true, '-first': index === 0, '-last': index === headerMenus.length - 1 }))}
          <div class="slot-right" part="slot-right">
            <slot name="right"></slot>
          </div>
          ${this.isMobileBreakpoint
            ? html` <hamburger-menu
                class="hamburger-menu"
                part="hamburger-menu"
                .toggled="${this.hamburgerMenuExpanded}"
                @state-changed="${(e: CustomEvent) => {
                  this.hamburgerMenuExpanded = e.detail;
                }}"
              ></hamburger-menu>`
            : nothing}
        </div>
      </header>

      ${mainMenusEmpty
        ? nothing
        : html` <main class="main" part="main">
            ${!this.isMobileBreakpoint && (menuMain !== nothing || menuSettings !== nothing)
              ? html` <div class="container-max-width inner">
                  ${menuMain !== nothing ? html` <div class="menu-main menu" part="menu-main">${menuMain}</div>` : nothing}
                  ${menuSettings !== nothing ? html` <div class="menu-settings menu" part="menu-settings">${menuSettings}</div>` : nothing}
                </div>`
              : nothing}
            ${this.isMobileBreakpoint && this.hamburgerMenuExpanded
              ? html` <!-- Meta bar -->
                  ${this.renderMetaBar(menuLogout)}
                  <!-- Hamburger Menu Tree Elements -->
                  <div class="tree-container" part="tree-container">
                    ${this._createTreeTemplate()}
                    <div class="slot-tree-bottom">
                      <slot name="tree-bottom"></slot>
                    </div>
                  </div>`
              : nothing}
          </main>`}
      ${!this.isMobileBreakpoint && currentItems !== nothing
        ? html` <div class="current" part="current">
            <div class="container-max-width inner">
              <div class="slot-current" part="slot-current">
                <slot name="current"></slot>
              </div>
              <div class="menu-current menu" part="menu-current">${currentItems}</div>
            </div>
          </div>`
        : nothing}
    </div>`;
  }

  /**
   * Hides any active dropdowns when a click occurs outside of the dropdown or its menu.
   */
  private __globalClickListener(e: Event) {
    if (!this.activeDropdown || !e.composed) {
      return;
    }

    // At this point, there should be an open dropdown
    const activeDropdownElement = this.shadowRoot && this.shadowRoot.querySelector('.dropdown.-show');
    if (!activeDropdownElement) {
      return;
    }

    // If the event path contains either the dropdown itself or its menu, let's bail…
    const elementMenu = activeDropdownElement.closest('.menu');
    if (e.composedPath().includes(activeDropdownElement) || e.composedPath().includes(elementMenu!)) {
      return;
    }

    // Click was outside of target elements, let's hide the currently active dropdown
    this.activeDropdown = undefined;
  }

  /**
   * Fetches the configuration data from the source provided by 'src' and initializes the configuration.
   */
  private __fetchRemoteData() {
    if (!this.src) {
      return;
    }

    (async () => {
      try {
        const response = await fetch(this.src!);
        const data = await response.json();

        this.configuration = new Configuration(data);
        this.dispatchEvent(new CustomEvent(NavigationEvents.configured, { detail: this.configuration, composed: true, bubbles: true }));
        this.__updateActivePathFromUrl();
        this.requestUpdateInternal();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('An error occurred when fetching remote data…', e);
      }
    })();
  }

  /**
   * Updates the active path from the current 'activeUrl'.
   */
  private __updateActivePathFromUrl() {
    const newPath = this.configuration.getIdPathForUrl(this.activeUrl);
    if (!newPath) {
      return;
    }

    this.activePath = newPath;
  }

  /**
   * Listener function that processes a setBadgeValue event.
   */
  private __setBadgeValueEventListener(e: CustomEvent) {
    const { detail: { id, url, value } = {} } = e;
    if ((id === undefined && url === undefined) || value === undefined) {
      console.warn('The event payload has to define an "id" or "url" property as well as "value".');
      return;
    }

    this.setBadgeValue(id || url, value);
  }

  /**
   * Listener function that processes a setActiveUrl event.
   */
  private __setActiveUrlEventListener(e: CustomEvent) {
    const { detail: url } = e;
    if (url === undefined || typeof url !== 'string') {
      console.warn('Event payload was either not defined or not a string.');
      return;
    }

    this.activeUrl = url;
  }

  /**
   * Set a badge value for a specific key. Menus/items will automatically look up badge values by their id. Items will
   * first check for badge values by using their id and then by using their url.
   *
   * @param {string} key - menuId or itemId or url
   * @param {*} value - the badge value (could be a l11n label object)
   */
  setBadgeValue(key: string, value: unknown): void {
    // TODO: write to Store instead of temporary map?
    this.temporaryBadgeValues.set(key, value);
    this.requestUpdateInternal();
  }

  /**
   * Checks for a badge for the given id. The url is only checked if no badge value was found for the id.
   *
   * @param id - a menuId or itemId
   * @param url - a url of an item
   *
   * @returns the badge value associated with the id or url or undefined if none exists.
   */
  getBadgeValue(id: string, url?: string): string | undefined {
    // TODO: read from Store instead of temporary map?
    let value = this.temporaryBadgeValues.get(id);
    if (!value && url) {
      value = this.temporaryBadgeValues.get(url);
    }

    if (value && typeof value === 'object' && value.constructor === Object) {
      return this.__getLabel(value);
    }

    return value;
  }

  private __toggleDropdown(menuId: string): void {
    this.activeDropdown = this.activeDropdown ? undefined : menuId;
  }

  /**
   * Renders the meta bar along with the logout menu, if given.
   *
   * We need a separate method for this, since the meta bar is rendered inside a different container
   * in mobile breakpoint (to make the entire container scrollable, if need be).
   *
   * @param menuLogout
   * @private
   */
  private renderMetaBar(menuLogout: TemplateResult | Nothing = nothing) {
    return html` <div class="meta-bar" part="meta-bar">
      <div class="container-max-width inner">
        <div class="slot-meta-left" part="slot-meta-left">
          <slot name="meta-left"></slot>
        </div>
        ${menuLogout !== nothing && this.logoutMenuInMetaBar && !(this.isMobileBreakpoint && this.logoutMenuInMobileHeader)
          ? html` <div class="menu-logout menu-logout-meta menu">${menuLogout}</div>`
          : nothing}
        <div class="slot-meta-right" part="slot-meta-right">
          <slot name="meta-right"></slot>
        </div>
      </div>
    </div>`;
  }

  /**
   * Creates the html template for a given menu id. This is basically providing a container which the menu's
   * items as first-level citizens in it or a dropdown link if the menu should be configured as a dropdown.
   *
   * @param menuId the menu id for which to build a menu html template.
   */
  private _createMenuTemplate(menuId: string): TemplateResult | Nothing {
    const menu = this.configuration.getMenu(menuId);
    if (!menu || !menu.items || menu.items.length <= 0) {
      return nothing;
    }

    if (menu && menu.dropdown) {
      const badge = this.getBadgeValue(menu.id!);
      const label = this.__getLabel(menu);
      return html`<span
          part="menu-${menuId}"
          id="menu-${menuId}"
          class="${classMap({
            link: true,
            'menu-link': true,
            'dropdown-link': true,
            [PortalNavigation.classes.selected]: this.activePath.contains(menuId),
          })}"
          @click="${() => this.__toggleDropdown(menuId)}"
          >${PortalNavigation._createLinkTemplate(menuId, label, menu.icon, badge)}</span
        >
        <div class="dropdown ${classMap({ '-show': this.activeDropdown === menuId })}">
          ${menu.items.map(item => this._createFirstLevelItemTemplate(item))}
        </div>`;
    }

    return html`${menu.items.map(item => this._createFirstLevelItemTemplate(item))}`;
  }

  /**
   * Creates the html template for items residing at first-level. These can be items with or without children.
   *
   * @param item the item to be rendered.
   * @param isTreeMode whether this template should be provided for tree mode (hamburger menu) or default display purposes.
   */
  private _createFirstLevelItemTemplate(item: FirstLevelMenuItem | MenuItem, isTreeMode = false): TemplateResult {
    const { id, icon, url, items } = item;
    const hasItems = items && items.length > 0;
    const badge = this.getBadgeValue(id!, url);
    const label = this.__getLabel(item);
    const active = this.activePath.contains(id!);
    const { expanded = false } = item as Record<string, boolean>;

    let refItem = item;
    if (hasItems) {
      refItem = this.__getDefaultItemOf(item) || item;
    }

    const { destination } = refItem;

    return html`<a
        href="${ifDefined(url)}"
        part="item-${ifDefined(id)}"
        id="item-${ifDefined(id)}"
        class="${classMap({
          link: true,
          'menu-link': true,
          'tree-parent': isTreeMode,
          [NavigationCssClasses.selected]: active,
          [NavigationCssClasses.expanded]: expanded,
        })}"
        target="${destination === 'extern' && !hasItems ? '_blank' : '_self'}"
        @click="${(e: Event) => this.__onLink(e, item)}"
        >${PortalNavigation._createLinkTemplate(id!, label, icon, badge)}${isTreeMode && hasItems
          ? html`<span class="tree-parent-indicator indicator" part="tree-parent-indicator"></span>`
          : nothing}</a
      >
      ${isTreeMode && (active || expanded) && hasItems
        ? html` <div class="tree-items">${item.items!.map(childItem => this._createSecondLevelItemTemplate(childItem))}</div>`
        : nothing}`;
  }

  /**
   * Creates the html template for the third row (second-level), which displays only if the active path
   * has a first-level item selection and that item has child items.
   */
  private _createCurrentItemsTemplate(): TemplateResult | Nothing {
    const parentItemId = this.activePath.getFirstLevelItemId();
    if (!parentItemId) {
      return nothing;
    }

    const menuId = this.activePath.getMenuId();
    const activeParentItem = this.configuration.getData([`menus::${menuId}`, `items::${parentItemId}`]);
    const hasCurrentItems = activeParentItem && !Array.isArray(activeParentItem) && activeParentItem.items && activeParentItem.items.length > 0;

    if (!hasCurrentItems) {
      return nothing;
    }

    return html`${(activeParentItem as MenuItem).items!.map(item => this._createSecondLevelItemTemplate(item))}`;
  }

  /**
   * Creates the html template for second-level items, which can either be in the third row (current items)
   * or second-level in tree mode (hamburger menu).
   *
   * @param item the item for which to create a html template.
   */
  private _createSecondLevelItemTemplate(item: MenuItem): TemplateResult {
    const { id, icon, url, destination } = item;
    const badge = this.getBadgeValue(id!, url);
    const label = this.__getLabel(item);
    const active = this.activePath.contains(id!);

    return html`<a
      href="${ifDefined(url)}"
      part="item-${ifDefined(id)}"
      id="item-${ifDefined(id)}"
      class="${classMap({
        link: true,
        'menu-link': true,
        [NavigationCssClasses.selected]: active,
      })}"
      @click="${(e: Event) => this.__onLink(e, item)}"
      target="${destination === 'extern' ? '_blank' : '_self'}"
      >${PortalNavigation._createLinkTemplate(id!, label, icon, badge)}</a
    >`;
  }

  /**
   * Create a simple html template for a link. All menu and item templates use this template to display
   * the label, icon and badge value.
   *
   * @param {string} id - the id of the link (used to create named css classes and parts).
   * @param {string} label - the label to be displayed. Either label or icon must be present (or both).
   * @param {string} icon - the icon to be displayed. Either label or icon must be present (or both).
   * @param {string} badge - the badge value to be displayed. If undefined, no badge will be displayed. If there is an icon,
   * the badge will be associated with the icon. Otherwise it will be associated with the label.
   */
  private static _createLinkTemplate(id: string, label?: string, icon?: string, badge?: string): TemplateResult[] {
    const result = [];
    if (icon) {
      result.push(html`<img src="${icon}" alt="" part="${`icon-${id}`}" id="${`icon-${id}`}" class="icon" />`);
      if (badge) {
        result.push(html`<span part="${`badge-${id}`}" id="${`badge-${id}`}" class="badge">${badge}</span>`);
      }
    }

    if (label) {
      result.push(html`<span part="${`label-${id}`}" id="${`label-${id}`}" class="label">${label}</span>`);
      if (!icon && badge) {
        result.push(html`<span part="${`badge-${id}`}" id="${`badge-${id}`}" class="badge">${badge}</span>`);
      }
    }

    return result;
  }

  /**
   * Creates the html template for tree mode (hamburger menu).
   * You may override this to customize the order and elements of the tree structure for the hamburger menu.
   */
  private _createTreeTemplate(): TemplateResult[] | Nothing {
    const templates: TemplateResult[] = [];

    // Remove logout menu from tree template if it should be displayed in mobile header
    const menus = PortalNavigation.menuIdsOrdered.filter(menu => !(menu === NavigationMenus.logout && this.logoutMenuInMobileHeader));

    menus.forEach(menuId => {
      const menu = this.configuration.getMenu(menuId);
      if (menu) {
        templates.push(...menu.items!.map(item => this._createFirstLevelItemTemplate(item, true)));
      }
    });

    if (templates.length < 1) {
      return nothing;
    }

    return templates;
  }

  /**
   * Callback that controls the behavior when clicking on any link (except links to open a dropdown).
   *
   * @param e - the click event.
   * @param item - the item being clicked.
   */
  private __onLink(e: Event, item: MenuItem): void {
    if (!item) {
      return;
    }

    const hasItems = item.items && item.items.length > 0;
    const internalRouting = this.__isInternalRouting(item);
    const { expanded = false } = item as Record<string, boolean>;

    // On mobile and for items with children, we compare the active path to the path of the item clicked
    // If they match, this means we will reset the active path which should "close" an open menu
    const objectPath = this.configuration.getObjectPathForSelection(object => object.id === item.id);
    if (this.isMobileBreakpoint && hasItems && (this.activePath.equals(objectPath.toIdPath()) || expanded)) {
      e.preventDefault();
      this.activePath = new IdPath();
      return;
    }

    // Open external items with children in mobile as well
    if (this.isMobileBreakpoint && hasItems && !internalRouting) {
      e.preventDefault();
      this.activePath = objectPath.toIdPath();
      return;
    }

    if (!hasItems) {
      if (internalRouting) {
        e.preventDefault();
        this.__internalLinkSelected(item.id);
        return;
      }

      return;
    }

    // if the default item is external we don't want to honor this flag when clicking on a parent item
    if (internalRouting || this.__getDefaultItemOf(item)!.destination === 'extern') {
      e.preventDefault();
      this.__internalLinkSelected(item.id);
      return;
    }

    return;
  }

  /**
   * Checks whether an item should be routed internally or not.
   *
   * @param item the item to check.
   * @returns true if the item is internal.
   */
  private __isInternalRouting(item?: MenuItem): boolean {
    let refItem: MenuItem | undefined = item;
    if (item && item.items && item.items.length > 0) {
      refItem = <MenuItem>this.__getDefaultItemOf(item);
    }

    // Allow global `internalRouting` to be overridden by the item specific `internalRouting` property
    const itemInternalRouting = refItem && 'internalRouting' in refItem ? refItem.internalRouting : this.internalRouting;

    // Bail if we're not routing internally…
    if (!itemInternalRouting) {
      return false;
    }

    // The current application does not matter, we route internally…
    if (!this.currentApplication) {
      return true;
    }

    // Current application was set, but item is not application specific…
    if (refItem && !('application' in refItem)) {
      // We check whether the current application is in the list of `internalRoutingApplications`
      return (
        'internalRoutingApplications' in refItem && Array.prototype.includes.call((refItem as MenuItem).internalRoutingApplications, this.currentApplication)
      );
    }

    return !!refItem && refItem.application === this.currentApplication;
  }

  /**
   * Handles the behavior of an internal link being selected. Basically updates the active path.
   *
   * @param itemId the item being selected.
   */
  private __internalLinkSelected(itemId?: string): void {
    const objectPath = this.configuration.getObjectPathForSelection(object => object.id === itemId);
    const selectedItem = objectPath.getLastItem();
    const hasItems = selectedItem && selectedItem.items && selectedItem.items.length > 0;

    this.activeDropdown = undefined;

    let refItem = selectedItem;
    let dispatchEvent = true;
    let closeHamburgerExpanded = true;
    if (hasItems) {
      refItem = this.__getDefaultItemOf(selectedItem!);
      dispatchEvent = !!refItem && !this.isMobileBreakpoint && refItem.destination !== 'extern';

      // Expanded hamburger should be closed only when the clicked item does not have an internal default item
      // This ensures that accordions in mobile breakpoint can be expanded. The routeTo event will still be thrown
      // so applications might already load the requested route in the background.
      closeHamburgerExpanded = !dispatchEvent;

      this.activePath = objectPath.toIdPath().concat(dispatchEvent ? refItem!.id : undefined);
    } else {
      this.activePath = objectPath.toIdPath();
    }

    if (dispatchEvent) {
      this.dispatchEvent(
        new CustomEvent(NavigationEvents.routeTo, {
          detail: {
            url: (refItem as MenuItem)!.url,
            label: refItem!.label,
          },
          bubbles: true,
          composed: true,
        })
      );

      if (this.hamburgerMenuExpanded && closeHamburgerExpanded) {
        this.hamburgerMenuExpanded = false;
      }
    }
  }

  /**
   * Returns the default item of a given item or the first child item if no default item is defined or undefined if
   * no child items exist.
   *
   * @param item the item whose default item should be found.
   * @returns the default item of the given item or undefined if no child items exist.
   */
  private __getDefaultItemOf(item: CommonMenuItem): MenuItem | undefined {
    const { defaultItem, items } = item as MenuItem;

    // there are no items to choose from
    if (!Array.isArray(items) || items.length < 1) {
      return;
    }

    // if no defaultItem is defined or it can't be found use the first item.
    return items.find(childItem => childItem.id === defaultItem) || items[0];
  }

  /**
   * Returns the proper label for the given labelProvider. A labelProvider is either a simple string (the label itself)
   * or it is an object with country code keys and associated label values: e.g. { 'en': 'Back', 'de': 'Zurück'}
   * It may also be an object with a property 'label' that contains one of the above values.
   *
   * @param labelProvider the raw label (localized labels array) or simple label or an object containing this
   * information within a property 'label'.
   */
  private __getLabel(labelProvider: string | CommonMenuItem | MenuLabel): string {
    let labelObj: string | CommonMenuItem | MenuLabel | undefined = labelProvider;
    if ('label' in <never>labelProvider) {
      labelObj = (labelProvider as CommonMenuItem).label;
    }

    if (typeof labelObj === 'string') {
      return labelObj;
    }

    if (!labelObj || !this.language) {
      return '';
    }

    if (this.language in labelObj) {
      return (labelObj as MenuLabel)[this.language];
    }

    return '';
  }

  /**
   * Updates the padding of the anchor when navigation should be sticky.
   *
   * @private
   */
  private updateAnchorPaddingWhenSticky() {
    // Bail when anchor is available or we're not in sticky mode
    if (!this.sticky || !this.anchorElement) {
      return;
    }

    // Do nothing to the padding when the mobile menu is open
    if (this.isMobileBreakpoint && this.hamburgerMenuExpanded) {
      return;
    }

    const { height = 0 } = this.container?.getBoundingClientRect() || {};
    if (height <= 0) {
      return;
    }

    const targetPadding = `${height}px`;
    if (this.anchorElement.style.paddingTop === targetPadding) {
      return;
    }

    // Save initial padding in case we need to restore it later
    if (this.initialAnchorElementPadding === undefined) {
      this.initialAnchorElementPadding = this.anchorElement.style.paddingTop;
    }

    this.anchorElement.style.paddingTop = targetPadding;
  }

  /**
   * Tries to find the anchor element used when navigation is sticky.
   * @private
   */
  private getElementForAnchor(): HTMLElement | undefined {
    if (!this.shadowRoot) {
      return;
    }

    const [anchor] = this.shadowRoot.ownerDocument.querySelectorAll(`${this.anchor}`);
    if (!anchor || !(anchor instanceof HTMLElement)) {
      return;
    }

    return anchor;
  }

  /**
   * Returns the internal configuration property.
   */
  getConfiguration(): Configuration {
    return this.configuration;
  }

  /**
   * Returns the internal activePath property.
   */
  getActivePath(): IdPath {
    return this.activePath;
  }

  /**
   * Returns the internal temporary badge values property.
   */
  getTemporaryBadgeValues(): Map<unknown, unknown> {
    return this.temporaryBadgeValues;
  }
}
