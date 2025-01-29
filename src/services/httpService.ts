import apiClient from "./apiClient";

interface Entity {
  id: number;
}

class HttpsService {
  endPoint: string;

  constructor(endPoint: string) {
    this.endPoint = endPoint;
  }

  getAllItems<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endPoint, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  delete(entityId: number) {
    return apiClient.delete(this.endPoint + "/" + entityId);
  }

  update<T extends Entity>(entity: T) {
    return apiClient.patch(this.endPoint + "/" + entity.id, entity);
  }
}

const create = (endpoint: string) => new HttpsService(endpoint);
export default create;
