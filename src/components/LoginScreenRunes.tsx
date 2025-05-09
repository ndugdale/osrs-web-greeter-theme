import { useEffect, useRef } from "react";

class Sprite {
  static CACHE?: Sprite[];

  pixels: Uint8Array;
  width: number;
  height: number;

  constructor(pixels: Uint8Array, width: number, height: number) {
    this.pixels = pixels;
    this.width = width;
    this.height = height;
  }
}

export default function LoginScreenRunes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animation = new LoginScreenAnimation(canvasRef.current);
    return () => animation.destroy();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
    />
  );
}

class LoginScreenAnimation {
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  pixels: Int32Array;
  rgba: Uint8ClampedArray;
  animationFrame?: number;
  lastTimestamp = Date.now();
  cycle: number = 0;
  destroyed: boolean = false;

  field1234: Int32Array;
  field1219: Int32Array;
  field1220: Int32Array;
  field1217: Int32Array;
  field1222: Int32Array;
  field1225: Int32Array;
  field1214: Int32Array;
  field1233: Int32Array;
  field1230: Int32Array;
  field1218: number = 0;
  field1235: number = 0;
  field1224: number = 0;
  field1229: number = 0;
  field1226: number = 0;
  field1231: number = 0;

  constructor(canvas: HTMLCanvasElement | null) {
    let ctx = canvas?.getContext("2d");
    if (canvas == null || ctx == null)
      throw new Error("Failed to get Canvas 2D rendering context");
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.pixels = new Int32Array(this.width * this.height);
    this.rgba = new Uint8ClampedArray(this.pixels.length * 4);
    this.field1234 = new Int32Array(256);
    this.field1220 = new Int32Array(256);
    this.field1217 = new Int32Array(256);
    this.field1222 = new Int32Array(256);
    this.field1219 = new Int32Array(256);
    this.field1233 = new Int32Array(32768);
    this.field1230 = new Int32Array(32768);
    this.field1225 = new Int32Array(32768);
    this.field1214 = new Int32Array(32768);

    let i;
    for (i = 0; i < 64; ++i) this.field1220[i] = i * 0x40000;
    for (i = 0; i < 64; ++i) this.field1220[i + 64] = i * 0x400 + 0xff0000;
    for (i = 0; i < 64; ++i) this.field1220[i + 128] = i * 4 + 0xffff00;
    for (i = 0; i < 64; ++i) this.field1220[i + 192] = 0xffffff;
    for (i = 0; i < 64; ++i) this.field1217[i] = i * 0x400;
    for (i = 0; i < 64; ++i) this.field1217[i + 64] = i * 4 + 0x00ff00;
    for (i = 0; i < 64; ++i) this.field1217[i + 128] = i * 0x40000 + 0xffff;
    for (i = 0; i < 64; ++i) this.field1217[i + 192] = 0xffffff;
    for (i = 0; i < 64; ++i) this.field1222[i] = i * 4;
    for (i = 0; i < 64; ++i) this.field1222[i + 64] = i * 0x40000 + 0xff;
    for (i = 0; i < 64; ++i) this.field1222[i + 128] = i * 0x400 + 0xff00ff;
    for (i = 0; i < 64; ++i) this.field1222[i + 192] = 0xffffff;

    this.method2215(undefined);
    this.loadSprites().then(() => this.animate());
  }

  animate() {
    if (this.destroyed) return;

    let numFrames = Math.floor((Date.now() - this.lastTimestamp) / 20); // Target 50 FPS
    this.lastTimestamp += numFrames * 20;
    if (numFrames > 5) numFrames = 1;

    if (numFrames > 0) {
      while (numFrames-- > 0) {
        this.cycle++;
        this.draw(-20, this.cycle);
        this.draw(this.width - 108, this.cycle);
      }

      for (let i = 0; i < this.pixels.length; i++) {
        let p = this.pixels[i];
        this.rgba[i * 4] = (p >> 16) & 0xff;
        this.rgba[i * 4 + 1] = (p >> 8) & 0xff;
        this.rgba[i * 4 + 2] = p & 0xff;
        this.rgba[i * 4 + 3] = (p >> 24) & 0xff;
      }
      this.ctx.putImageData(
        new ImageData(this.rgba, this.width, this.height),
        0,
        0,
      );
    }

    this.animationFrame = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    this.destroyed = true;
    if (this.animationFrame !== undefined)
      cancelAnimationFrame(this.animationFrame);
  }

  async loadSprites() {
    if (Sprite.CACHE != null) return;

    // Only load once, yahooooo
    Sprite.CACHE = [];

    let r = require.context("../assets/sprites", false, /\.png$/);
    let ctx = this.ctx;
    Sprite.CACHE = await Promise.all<Sprite>(
      r
        .keys()
        .sort((a: string, b: string) => {
          const regex = /^\d+/;
          let ma = a.match(regex);
          if (ma != null) {
            let mb = b.match(regex);
            if (mb != null) return parseInt(ma[0]) - parseInt(mb[0]);
          }
          return a.localeCompare(b);
        })
        .map(
          (key) =>
            new Promise((resolve, _) => {
              let data = r(key);
              let img = new Image();
              img.onload = function () {
                ctx.clearRect(0, 0, img.width, img.height);
                ctx.drawImage(img, 0, 0);
                let { data } = ctx.getImageData(0, 0, img.width, img.height);
                let rgba = new Int32Array(data.buffer);
                let mask = new Uint8Array(rgba.length);
                for (let i = 0; i < rgba.length; i++)
                  mask[i] = (rgba[i] >> 24) & 0xff;
                resolve(new Sprite(mask, img.width, img.height));
              };
              img.src = data;
            }),
        ),
    );
  }

  draw(xOffset: number, cycle: number) {
    if (this.field1231 === 0) this.field1231 = cycle;

    let var3 = cycle - this.field1231;
    if (var3 >= 256) var3 = 0;

    this.field1231 = cycle;
    if (var3 > 0) this.method2207(var3, cycle);

    this.method2213(xOffset);
  }

  method2207(var1: number, cycle: number) {
    this.field1229 += var1 << 7;
    if (this.field1229 > this.field1233.length) {
      this.field1229 -= this.field1233.length;
      if (Sprite.CACHE != null)
        this.method2215(
          Sprite.CACHE[Math.floor(Math.random() * Sprite.CACHE.length)],
        );
    }

    let var2 = 0;
    let var3 = var1 << 7;
    let var4 = (256 - var1) << 7;

    let var6;
    for (let var5 = 0; var5 < var4; ++var5) {
      var6 =
        this.field1225[var3 + var2] -
        Math.floor(
          (this.field1233[
            (var2 + this.field1229) & (this.field1233.length - 1)
          ] *
            var1) /
            6,
        );
      if (var6 < 0) var6 = 0;

      this.field1225[var2++] = var6;
    }

    let var15 = 10;
    var6 = 128 - var15;

    let var7, var10;
    for (var7 = 256 - var1; var7 < 256; ++var7) {
      let var8 = var7 << 7;

      for (let var9 = 0; var9 < 128; ++var9) {
        var10 = Math.floor(Math.random() * 100.0);
        this.field1225[var8 + var9] =
          var10 < 50 && var9 > var15 && var9 < var6 ? 0xff : 0;
      }
    }

    if (this.field1235 > 0) this.field1235 -= var1 * 4;

    if (this.field1224 > 0) this.field1224 -= var1 * 4;

    if (this.field1235 === 0 && this.field1224 === 0) {
      var7 = Math.floor(Math.random() * Math.floor(2000 / var1));
      if (var7 === 0) this.field1235 = 0x400;
      if (var7 === 1) this.field1224 = 0x400;
    }

    for (var7 = 0; var7 < 256 - var1; ++var7)
      this.field1234[var7] = this.field1234[var7 + var1];

    for (var7 = 256 - var1; var7 < 256; ++var7) {
      this.field1234[var7] = Math.floor(
        Math.sin(this.field1218 / 14.0) * 16.0 +
          Math.sin(this.field1218 / 15.0) * 14.0 +
          Math.sin(this.field1218 / 16.0) * 12.0,
      );
      ++this.field1218;
    }

    this.field1226 += var1;
    var7 = ((cycle & 1) + var1) >> 1;
    if (var7 > 0) {
      let var16 = 128;
      let var17 = 2;
      var10 = 128 - var17 - var17;

      let var11;
      let var12;
      let var13;
      for (var11 = 0; var11 < this.field1226 * 100; ++var11) {
        var12 = Math.floor(Math.random() * var10) + var17;
        var13 = Math.floor(Math.random() * var16) + var16;
        this.field1225[var12 + (var13 << 7)] = 192;
      }

      this.field1226 = 0;

      let var14;
      for (var11 = 0; var11 < 256; ++var11) {
        var12 = 0;
        var13 = var11 << 7;

        for (var14 = -var7; var14 < 128; ++var14) {
          if (var14 + var7 < 128) var12 += this.field1225[var7 + var13 + var14];
          if (var14 - (var7 + 1) >= 0)
            var12 -= this.field1225[var13 + var14 - (var7 + 1)];
          if (var14 >= 0)
            this.field1214[var13 + var14] = Math.floor(
              var12 / (Math.imul(var7, 2) + 1),
            );
        }
      }

      for (var11 = 0; var11 < 128; ++var11) {
        var12 = 0;

        for (var13 = -var7; var13 < 256; ++var13) {
          var14 = var13 << 7;
          if (var7 + var13 < 256)
            var12 += this.field1214[var11 + var14 + var7 * 128];
          if (var13 - (var7 + 1) >= 0)
            var12 -= this.field1214[var14 + var11 - (var7 + 1) * 128];
          if (var13 >= 0)
            this.field1225[var14 + var11] = var12 / (var7 * 2 + 1);
        }
      }
    }
  }

  method2212(var1: number, var2: number, var3: number) {
    let var4 = 256 - var3;
    return (
      (((var3 * (var2 & 0x00ff00) + var4 * (var1 & 0x00ff00)) & 0xff0000) +
        ((var4 * (var1 & 0xff00ff) + var3 * (var2 & 0xff00ff)) & 0xff00ff00)) >>
      8
    );
  }

  method2213(var1: number) {
    let var2 = this.field1219.length;
    if (this.field1235 > 0) {
      this.method2224(this.field1235, this.field1217);
    } else if (this.field1224 > 0) {
      this.method2224(this.field1224, this.field1222);
    } else {
      for (let var3 = 0; var3 < var2; ++var3)
        this.field1219[var3] = this.field1220[var3];
    }

    this.method2214(var1);
  }

  method2224(var1: number, var2: Int32Array) {
    let var3 = this.field1219.length;

    for (let var4 = 0; var4 < var3; ++var4) {
      if (var1 > 768) {
        this.field1219[var4] = this.method2212(
          this.field1220[var4],
          var2[var4],
          0x400 - var1,
        );
      } else if (var1 > 256) {
        this.field1219[var4] = var2[var4];
      } else {
        this.field1219[var4] = this.method2212(
          var2[var4],
          this.field1220[var4],
          256 - var1,
        );
      }
    }
  }

  method2214(var1: number) {
    let var2 = 0;
    for (let var3 = 1; var3 < 0xff; ++var3) {
      let var4 = ((256 - var3) * this.field1234[var3]) >> 8;
      let var5 = var4 + var1;
      let var6 = 0;
      let var7 = 128;
      if (var5 < 0) {
        var6 = -var5;
        var5 = 0;
      }

      if (var5 + 128 >= this.width) var7 = this.width - var5;

      let i = var5 + (var3 + 8) * this.width;
      var2 += var6;

      for (let var9 = var6; var9 < var7; ++var9) {
        let var10 = this.field1225[var2++];
        let col = i % this.width;
        if (var10 !== 0 && col >= 0 && col < this.width) {
          this.pixels[i++] =
            ((var10 & 0xff) << 24) | (this.field1219[var10] & 0xffffff);
        } else {
          ++i;
        }
      }

      var2 += 128 - var7;
    }
  }

  method2215(sprite: Sprite | undefined) {
    let i;
    for (i = 0; i < this.field1233.length; ++i) this.field1233[i] = 0;

    let row;
    for (i = 0; i < 5000; ++i) {
      row = Math.floor(Math.random() * 128.0 * 256.0);
      this.field1233[row] = Math.floor(Math.random() * 256.0);
    }

    let col, j;
    for (i = 0; i < 20; ++i) {
      for (row = 1; row < 0xff; ++row) {
        for (col = 1; col < 127; ++col) {
          j = col + (row << 7);
          this.field1230[j] =
            (this.field1233[j + 128] +
              this.field1233[j - 128] +
              this.field1233[j + 1] +
              this.field1233[j - 1]) >>
            2;
        }
      }

      let tmp = this.field1233;
      this.field1233 = this.field1230;
      this.field1230 = tmp;
    }

    if (sprite != null) {
      i = 0;
      for (row = 0; row < sprite.height; ++row)
        for (col = 0; col < sprite.width; ++col)
          if (sprite.pixels[i++] !== 0)
            this.field1233[col + 16 + ((row + 16) << 7)] = 0;
    }
  }
}
