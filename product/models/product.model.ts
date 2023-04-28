import mongoose, { Schema } from "mongoose";
import { Category } from "./category.model";

interface Product {
  product_name: string;
  slug: string;
  image: string;
  category: Category;
}

const ProductSchema = new Schema<Product, Document>(
  {
    product_name: { type: String, required: true, unique: true },
    image: {
      type: String,
      default:
        "https://scontent.fsgn5-11.fna.fbcdn.net/v/t39.30808-6/319679335_537631668262888_5340863634551239276_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=TEm6Fxwd6L0AX9vz5nw&_nc_ht=scontent.fsgn5-11.fna&oh=00_AfA2Vehl2Rb1OaSOsNtmsdLK8mH1I1XKdvqZpV8IUfVFzg&oe=6440213A",
    },
    slug: {
      type: String,
      unique: true,
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {},
    },
  }
);

export const slugify = (...args: string[]): string => {
  const value = args.join(" ");

  return value
    .normalize("NFD") // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "") // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, "-"); // separator
};

ProductSchema.pre("save", async function (done) {
  this.set("slug", slugify(this.product_name));
  done();
});

const Product = mongoose.model<Product & Document>("Product", ProductSchema);

export { Product };
