// export type JsonType =
//   | string
//   | number
//   | boolean
//   | null
//   | JsonType[]
//   | { [key: string]: JsonType };

// export type JsonType = JsonType[] | { [key: string]: JsonType };

type JsonPrimitive = string | number | boolean | null | JsonArray | JsonObject;

type JsonArray = JsonPrimitive[];
type JsonObject = { [key: string]: JsonPrimitive };

export type JsonType = JsonArray | JsonObject;
