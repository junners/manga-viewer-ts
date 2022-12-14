import axios, { AxiosError } from "axios";

export default class Pager {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  fetchPage(): Promise<string | undefined> {
    const axiosConfig = {};
    const HTMLData = axios
      .get(this.url, { headers: axiosConfig })
      .then((res) => res.data)
      .catch((error: AxiosError) => {
        console.error(error.toJSON());
      });

    return HTMLData;
  }
}
