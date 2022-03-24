import mongoose from 'mongoose';

const searchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Search = mongoose.model('Search', searchSchema);
export default Search;
