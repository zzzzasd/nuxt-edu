export default async function ({ store, redirect}) {
  if (!store.getters['users/isAuthenticated']) {
    return redirect('/login')
  }
}
