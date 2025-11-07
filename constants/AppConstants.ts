const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const APP_CONSTANTS = {
  CARD_VIEW_MAP: "map-view",
  CARD_VIEW_TILE: "tile-view",
  DEFAULT_THUMBNAIL: `${process.env.PUBLIC_URL}/images/house.png`,
  LIST_ICON: `${process.env.PUBLIC_URL}/images/list.png`,
  PAGINATION_LIMIT: 100,
  DUMMY_IMAGE: "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=",
  MAX_FILE_SIZE_MB,
  MAX_FILE_SIZE_BYTES
};