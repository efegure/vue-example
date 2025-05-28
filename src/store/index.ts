import { createStore } from 'vuex'
import { horseModule } from './modules/horses'
import { raceModule } from './modules/race'
import { resultModule } from './modules/result'

export const store = createStore({
  modules: {
    horses: horseModule,
    race: raceModule,
    result: resultModule,
  },
})
