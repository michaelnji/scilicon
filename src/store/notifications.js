import { writable } from "svelte/store";
import { v4 as uuidv4 } from "uuid";
export const notifications = writable([]);

export const addNotification = (notification) => {
  // Create a unique ID so we can easily find/remove it
  // if it is dismissible/has a timeout.
  const id = uuidv4();

  // Setup some sensible defaults for a notification.
  const defaults = {
    id,
    type: "info",
    title: "info",
    dismissible: true,
    timeout: 3000,
  };

  // Push the notification to the top of the list of notifications
  notifications.update((all) => [{ ...defaults, ...notification }, ...all]);

  // If notification is dismissible, dismiss it after "timeout" amount of time.
  if (notification.timeout)
    setTimeout(() => dismissNotification(id), notification.timeout);
};

export const dismissNotification = (id) => {
  notifications.update((all) => all.filter((t) => t.id !== id));
};
