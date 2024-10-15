
import { init, defineAppData } from '@router';

import '@styles/index.scss'

defineAppData({
  nav: [
    {
      icon: "board",
      group: "boards",
      page: "index",
      label: "Board"
    }, 
    {
      icon: "list",
      group: "lists",
      page: "index",
      label: "List"
    },  
    {
      icon: "calendar",
      group: "calendar",
      page: "index",
      label: "Calendar"
    },  
    {
      icon: "alert",
      group: "alerts",
      page: "index",
      label: "Alert"
    }
  ],
  groups: {
    alerts: {
      shell: "nav",
    },
    boards: {
      shell: "nav",
    },
    calendar: {
      shell: "nav",
    },
    lists: {
      shell: "nav",
    },
    test: {
      shell: "nav",
      cluster: [
        {
          name: "index",
          page: "index",
          icon: "test",
        },
        {
          name: "test",
          page: "test",
          icon: "test",
        },
      ]
    },
    other: {
      shell: "minimal"
    },
  },
  widgets: {}
})

init()
