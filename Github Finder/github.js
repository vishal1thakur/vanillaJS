class Github {
  constructor() {
    this.client_id = '94177ba465101f254c14';
    this.client_secret = '6aceb72fc2d9ffd1d61295125c7a5966c961c270';
  }

  async getUser(user) {
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    const profile = await profileResponse.json();

    return {
      profile,
    };
  }
}
