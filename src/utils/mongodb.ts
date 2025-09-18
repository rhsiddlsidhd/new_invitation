import mongoose from "mongoose";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@new-invitation-cluster.8umdvcl.mongodb.net/new_invitation?retryWrites=true&w=majority&appName=new-invitation-cluster`;

if (!uri) {
  throw new Error(`MongoDB URI를 확인해주세요.`);
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = {
    conn: null,
    promise: null,
  };
}

export const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(uri, opts);
  }

  try {
    cached.conn = await cached.promise;

    console.log("MongoDB Connected");
    return cached.conn;
  } catch (e) {
    if (e instanceof Error) {
      console.error("MongoDB Connected Fail", e.message);
    }
    cached.promise = null;
    throw e;
  }
};

// 연결 상태 확인 함수
export const isConnected = () => {
  return mongoose.connection.readyState === 1;
};
