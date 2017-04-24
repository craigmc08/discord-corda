/* eslint-disable */

const watch = require('node-watch')

module.exports = class Watcher {
  /**
   * @constructor
   * @param {string} folder - The folder to watch
   * @param {WatcherCallback} callback - Function to execute when this is done
   * @param {WatcherOptions} options - Options for this watcher
   */
  constructor(folder, callback, options) {
    this.folder = folder
    this.callback = callback
    this._recursive = options.recursive_search
    this.watcher = undefined
    this.initializeWatch()
  }

  /**
   * Set's a value in the watcher
   * @param {(string|WatcherCallback)} val - New folder or callback to set
   */
  set(val) {
    if (typeof val === 'string') {
      this.folder = val
      this.restartWatch()
    } else if (typeof val === 'function') {
      this.callback = val
    }
  }

  /**
   * Starts watching for changes in specified folder
   */
  initializeWatch() {
    this.watcher = watch(
      this.folder,
      {recursive: this.recursive},
      this.callback)
  }
  /**
   * Stops watching for changes
   */
  killWatch() {
    this.watcher.close()
    this.watcher = undefined
  }
  /**
   * Stops and restarts watcher (to update settings)
   */
  restartWatch() {
    this.killWatch()
    this.initializeWatch()
  }

  /**
   * @param {boolean} val
   */
  set recursive(val) {
    this._recursive = val
    this.restartWatch()
  }
}

/**
 * Callback for the watcher
 * @callback WatcherCallback
 * @param {string} event
 * @param {string} filename
 */
/**
 * @typedef {object} WatcherOptions
 * @property {boolean} recursive_search
 */
