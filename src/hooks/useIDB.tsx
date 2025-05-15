"use client";

import { AppIDB } from "@/lib/idb";
import { useEffect, useState } from "react";

export function useIDB() {
  const [idbInstance, setIdbInstance] = useState<AppIDB | null>(null);

  useEffect(() => {
    if (!idbInstance) {
      setIdbInstance(new AppIDB());
    }
  }, [idbInstance]);

  const getData = async <T,>({ storeName }: { storeName: string }) => {
    if (!idbInstance) {
      console.error("IDB instance is not initialized");
      return [];
    }

    try {
      const result = await idbInstance.getData<T>(storeName);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const addData = async <T,>({
    storeName,
    data,
  }: {
    storeName: string;
    data: T;
  }) => {
    if (!idbInstance) {
      console.error("IDB instance is not initialized");
      return [];
    }

    try {
      await idbInstance.addData<T>(storeName, data);
    } catch (error) {
      throw error;
    }
  };

  const updateData = async <T,>({
    storeName,
    keyPath,
    data,
  }: {
    storeName: string;
    keyPath: string;
    data: T;
  }) => {
    if (!idbInstance) {
      console.error("IDB instance is not initialized");
      return [];
    }

    try {
      await idbInstance.updateData<T>(storeName, keyPath, data);
    } catch (error) {
      throw error;
    }
  };

  const deleteData = async ({
    storeName,
    keyPath,
  }: {
    storeName: string;
    keyPath: string;
  }) => {
    if (!idbInstance) {
      console.error("IDB instance is not initialized");
      return [];
    }

    try {
      await idbInstance.deleteData(storeName, keyPath);
    } catch (error) {
      throw error;
    }
  };

  return { idbInstance, getData, addData, updateData, deleteData };
}
