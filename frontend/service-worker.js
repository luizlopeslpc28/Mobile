const cacheVersion = 'v1';
const cacheName = `pwaCondoEasy-${cacheVersion}`;

// Instalação do Service Worker
self.addEventListener('install', event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        './index.html',
        './AppImages/ios/128.png',
        './AppImages/ios/144.png',
        './AppImages/ios/152.png',
        './AppImages/ios/167.png',
        './AppImages/ios/180.png',
        './AppImages/ios/192.png',
        './AppImages/ios/256.png',
        './AppImages/ios/512.png',
      ]);
    })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name.startsWith('pwaCondoEasy-') && name !== cacheName).map(name => caches.delete(name))
      );
    })
  );
});

// Interceptação de requisições de rede
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Exibição de notificação push
self.addEventListener('push', event => {
  const title = 'Título da notificação';
  const options = {
    body: 'Corpo da notificação',
    icon: './AppImages/ios/128.png',
    badge: './AppImages/ios/128.png'
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Ação ao clicar na notificação
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://localhost:1234/CadastrarUsuarios')
  );
});

// Sincronização em segundo plano
self.addEventListener('sync', event => {
  if (event.tag === 'syncData') {
    event.waitUntil(syncData());
  }
});

function syncData() {
  // Coloque aqui o código para sincronização em segundo plano
  // Pode ser uma requisição para enviar dados ao servidor, por exemplo

  // Exemplo:
  return fetch('http://localhost/1234/CadastrarUsuarios')
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
}
