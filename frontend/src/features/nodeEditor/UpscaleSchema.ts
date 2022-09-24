/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {}

export interface components {
  schemas: {
    /** Upscale */
    Upscale: {
      /**
       * Id
       * @description The id of this node. Must be unique among all nodes.
       */
      id: string;
      /**
       * Type
       * @enum {string}
       */
      type: "upscale";
      /**
       * Image
       * @description The image to upscale
       * @default
       */
      image?: string;
      /**
       * @description The upscale level
       * @default 2
       */
      level?: components["schemas"]["UpscaleLevel"];
      /**
       * Strength
       * @description The strength of the upscale
       * @default 0.75
       */
      strength?: number;
    };
    /**
     * UpscaleLevel
     * @description An enumeration.
     * @enum {integer}
     */
    UpscaleLevel: 2 | 4;
  };
}

export interface operations {}

export interface external {}
