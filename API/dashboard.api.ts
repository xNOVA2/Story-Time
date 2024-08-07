import api from "./middleware";

export const getUsers = async ({
  page,
  limit,
  search,
  status,
}: {
  page: number;
  limit: number;
  search: string;
  status: string;
}) => {
  try {
    const { data } = await api.get(
      `/user/get-users?limit=${limit || 15}&page=${page || 1}&search=${
        search || ""
      }&status=${status}`
    );
    return {
      success: true,
      response: data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const toggleUserBlock = async (id: string) => {
  try {
    const { data } = await api.put(`/user/update-status?userId=${id}`);
    return {
      success: true,
      response: data.message,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
}

export const userCount = async () => {
  try {

    const  {data} = await api.get('/user/user-count');
    return {
      success: true,
      response: data.data,
    };
  } catch (error:any) {
    return{
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    }
  }
}

export const guidelineLogs = async () => {
  try {
    const {data} = await api.get('/guideline/logs?limit=7');
    return {
      success: true,
      response: data.data,
    };
  } catch (error:any) {
    return{
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    }
  }
}