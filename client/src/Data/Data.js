import config from "./config";

export default class Data {
  api(path, method = "GET", body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // Check if auth is required
    if (requiresAuth) {    
      const encodedCredentials = btoa(
        `${credentials.username}:${credentials.password}`
      );
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }
    
    return fetch(url, options);
  }

  /**
   * GET a User
   */
  async getUser(username, password) {
    const response = await this.api(`/users`, 'GET', null, true, { username, password });
    
    if (response.status === 200) {
      return response.json()
        .then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  /**
   * GET a single Course
   */
  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, "GET", null);

    if (response.status === 200) {
      return response.json()
        .then((data) => data);
    } else if (response.status === 404) {
      return null;
    } else {
      throw new Error();
    }
  }

  /**
   * GET all Courses
   */
  async getCourses() {
    const response = await this.api(`/courses`, "GET", null);

    if (response.status === 200) {
      return response.json()
        .then((data) => data);
    } else {
      throw new Error();
    }
  }

  /**
   * POST a new Course
   */
  async createCourse(course, username, password) {
    const response = await this.api(`/courses`, "POST", course, true, {
      username,
      password,
    });

    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json()
        .then((data) => {
          return data.errors;
        });
    } else {
      throw new Error();
    }
  }

  /**
   * POST a new USER
   */
  async createUser(user) {
    const response = await this.api("/users", "POST", user);

    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json()
        .then((data) => {
          return data.errors;
        });
    } else {
      throw new Error();
    }
  }

  /**
   * PUT a course
   */
  async updateCourse(course, id, username, password) {
    const response = await this.api(`/courses/${id}`, "PUT", course, true, {
      username,
      password,
    });

    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json()
        .then((data) => data.errors);
    } else {
      throw new Error();
    }
  }

  /**
   * DELETE a Course
   */
  async deleteCourse(id, username, password) {
    const response = await this.api(`/courses/${id}`, "DELETE", null, true, {
      username,
      password,
    });

    if (response.status === 204) {
      return null;
    } else if (response.status === 403) {
      return null;
    } else {
      throw new Error();
    }
  }
}