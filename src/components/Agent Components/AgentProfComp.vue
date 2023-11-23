<template>
    <div class="agent-tab-one" dir="ltr">
        <div class="content p-4">
            <div class="welcome h-100 bg-white p-4 rounded-1">
                <h3>{{$t('dashAside.agent.welcome')}} {{ userData.name }}</h3>
                <div class="info d-flex align-items-center gap-4 justify-content-center flex-lg-row flex-column text-center mt-4">
                    <div :class="`box p-4 rounded-3 text-${$i18n.locale === 'en' ? 'start' : 'end'} flex-fill`"> 
                        <div class="d-flex justify-content-between align-items-center">
                            <h2 class="text-uppercase mb-0 fw-bold">
                                {{ $t('dashAside.agent.balance') }}
                            </h2>
                            <i class="fa-solid fa-sack-dollar fa-3x opacity-25"></i>
                        </div>
                        <span class="d-block mt-2 fs-1 fw-bold">{{ USDollar.format(userData.balance) }}</span>
                    </div>
                    <div :class="`box p-4 rounded-3 text-${$i18n.locale === 'en' ? 'start' : 'end'} flex-fill`">
                        <div class="d-flex justify-content-between align-items-center">
                            <h2 class="text-uppercase mb-0 fw-bold">
                                {{ $t('dashAside.agent.discount') }}
                            </h2>
                            <i class="fa-solid fa-percent fa-3x opacity-25"></i>
                        </div>
                        <span class="d-block mt-2 fs-1 fw-bold">{{ userData.discount }}%</span>
                    </div>
                </div>
            </div>
        </div>
        <Loader v-if="loading"></Loader>
    </div>
</template>
<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import Loader from '../Loader.vue';

const loading = ref(false)
const route = useRoute()
const userData = ref({})


// Formating Balanc 
const USDollar = Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency"
})


onMounted(async () => {
    loading.value = true
    await axios.get("https://seasonreal.seasonsge.com/usersview").then(data => {
        userData.value = data.data.filter(el => el.id == route.params.userId)[0]
        loading.value = false
    })

})
</script>
<style lang="scss" scoped>
.agent-tab-one {
    .content {
        .welcome {
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.090);
        }

        .box {
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.090);
            border: 1px solid var(--orange-color);
        }
    }
    @media (max-width: 767px) {
        .content {
            padding: 10px !important;
            .welcome {
                padding: 20px 15px !important;
            }
            .box {
                padding: 15px !important;
            }
        }
    }
}
</style>