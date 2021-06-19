<template>
  <div class="alert rounded border-l-4 p-4" :class="className">
    <div class="flex items-start">
      <div class="flex-shrink-0">
        <component :is="icon" class="alert-icon mt-px w-6 h-6" />
      </div>
      <div class="flex-grow ml-2 overflow-auto alert-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

type AlertType = 'info' | 'success' | 'warning' | 'danger'
const alertTypes = ['info', 'success', 'warning', 'danger']
import MdiAlert from '/@vite-icons/mdi/alert'
import MdiCheckCircle from '/@vite-icons/mdi/check-circle'
import MdiInformation from '/@vite-icons/mdi/information'
import MdiOctagram from '/@vite-icons/mdi/octagram'
export default defineComponent({
  components: {
    MdiAlert,
    MdiInformation,
    MdiCheckCircle,
    MdiOctagram
  },

  props: {
    type: {
      type: String as () => AlertType,
      default: 'info',
      validator: (value: string): boolean => {
        return alertTypes.includes(value)
      }
    }
  },

  setup(props) {
    const icon = computed(() => {
      return {
        info: 'mdi-information',
        success: 'mdi-check-circle',
        warning: 'mdi-alert',
        danger: 'mdi-alert-octagram'
      }[props.type as AlertType]
    })

    const className = computed(() => {
      return `alert-${props.type}`
    })

    return { icon, className }
  }
})
</script>

<style lang="scss" scoped>
.dark-mode .alert a {
  @apply text-gray-300;
}

.alert-content pre code {
  background-color: inherit;
}

.alert {
  p {
    @apply m-0;
  }

  a {
    @apply text-gray-700;
  }

  + strong {
    @apply text-current;
  }
}

.alert-info {
  @apply bg-blue-100 border-blue-400;

  code {
    @apply bg-blue-200 shadow-none border-0 text-current;
  }

  .alert-icon {
    @apply text-blue-400;
  }

  .alert-content {
    @apply text-blue-700;
  }
}

.dark-mode {
  .alert-info {
    @apply bg-blue-900 border-blue-700;
    code {
      @apply bg-blue-800;
    }

    .alert-content {
      @apply text-blue-300;
    }
  }

  .alert-success {
    @apply bg-green-900 border-green-700;

    code {
      @apply bg-green-800;
    }
    .alert-content {
      @apply text-green-300;
    }
  }

  .alert-warning {
    @apply bg-yellow-900 border-yellow-700;
    code {
      @apply bg-yellow-800;
    }
    .alert-content {
      @apply text-orange-300;
    }
  }

  .alert-danger {
    @apply bg-red-900 border-red-700;
    code {
      @apply bg-red-800;
    }
    .alert-content {
      @apply text-red-300;
    }
  }
}

.alert-success {
  @apply bg-green-100 border-green-400;

  code {
    @apply bg-green-200 shadow-none border-0 text-current;
  }
  .alert-icon {
    @apply text-green-400;
  }
  .alert-content {
    @apply text-green-700;
  }
}

.alert-warning {
  @apply bg-orange-100 border-orange-400;
  code {
    @apply bg-orange-200 shadow-none border-0 text-current;
  }
  .alert-icon {
    @apply text-orange-400;
  }
  .alert-content {
    @apply text-orange-700;
  }
}

.alert-danger {
  @apply bg-red-100 border-red-400;
  code {
    @apply bg-red-200 shadow-none border-0 text-current;
  }
  .alert-icon {
    @apply text-red-400;
  }
  .alert-content {
    @apply text-red-700;
  }
}
</style>
