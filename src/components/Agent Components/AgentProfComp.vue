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
                        <div class="d-flex justify-content-between align-items-center">

                            <span class="d-block mt-2 fs-1 fw-bold">{{ USDollar.format(userData.balance) }}</span>
                            <button class="btn btn-primary py-1 px-4 mt-2" @click="payment()">شحن المحفظة</button>
                        </div>
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
                    <div class="alert alert-danger alert-dismissible text-center position-fixed" role="alert">
                        <div class="d-flex align-items-center justify-content-center gap-2">
                            {{ $t('dashAside.agent.recharge') }}
                            شحن المحظة
                        </div>
                        <div>
                            <div> :القيمة </div>
                            <div class="m-2">
                                <input class="rounded-1 " v-model="paymentBalance" type="number">
                            </div>
                            <button class="btn btn-primary py-1 px-4" @click="goToPayment()">دفع</button>
                        </div>
                        <button @click="removeAlert('danger')" type="button" class="btn-close"></button>
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
let paymentBalance = ref(1000);
const goToPayment = ()=>{
                const balance = new FormData()

                balance.append("user_id", userData.value.id)
                balance.append("total", paymentBalance.value)

                axios.post("https://seasonreal.seasonsge.com/appv1real/user_balance", balance).then(userResponse => {
                    setTimeout(() => {
                        document.querySelector(".alert-danger").classList.remove("active")
                        location.href = userResponse.data.URL
                    }, 3000)
                loading.value = false

                })

}
// Formating Balanc 
const USDollar = Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency"
})
const payment = ()=>{
    document.querySelector(".alert-danger").classList.add("active")
}
const removeAlert = (type) => {
    document.querySelector(`.alert-${type}`).classList.remove("active")
}
onMounted(async () => {
    loading.value = true
    await axios.get("https://seasonreal.seasonsge.com/appv1real/usersview").then(data => {
        userData.value = data.data.filter(el => el.id == route.params.userId)[0]
        loading.value = false
    })

})
</script>
<style lang="scss" scoped>

.alert-danger{
    background-color: var(--blue-color);
    color: white;
    border: solid 1px var(--blue-color);
}

.alert {
    top: -25%;
    left: 50%;
    transform: translateX(-50%);
    transition: 0.3s;
    width: fit-content;
    z-index: 555555555;

    &.active {
        top: 5%;
    }

    button {
        box-shadow: none;
        outline: none;
    }
}

 @media (max-width: 767px) {
        .alert {
            width: 90%;
            text-align: start !important;
            font-size: 12px;

            i {
                font-size: 16px !important;
            }
        }

       

        .content {
            padding: 20px 15px !important;
        }
    }
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