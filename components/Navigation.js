import React from 'react'
import { createBottomTabNavigator, createAppContainer } from "react-navigation"

import NowPlayingTab from "./NowPlayingTab";
import SearchTab from "./SearchTab";
import ListsTab from "./ListsTab";

const Navigation = createBottomTabNavigator({
    NowPlaying: {
        screen: NowPlayingTab
    },
    Search: {
        screen: SearchTab
    },
    Lists: {
        screen: ListsTab
    },
}, {
    tabBarOptions: {
        showLabel: true,
        activeTintColor: '#6495ed',
        inactiveTintColor: 'grey',
    },
}
)

export default createAppContainer(Navigation)