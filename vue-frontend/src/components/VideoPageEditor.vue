<script setup>
import { reactive, watch, ref, computed } from 'vue'
import { useStore } from 'vuex'

const emit = defineEmits(['formSubmit'])
import VideoPlayer from './video/VideoPlayer.vue'

const props = defineProps({
  movie: {
    type: Object
  },
  isEditing: {
    type: Boolean
  }
})

const store = useStore();

const videoInput = ref(null);

const form = reactive({
  title: props.movie?.title || '',
  description: props.movie?.description || '',
  video_file: props.movie?.video_file || null
})

const errors = reactive({
  title: '',
  video_file: ''
})

const pageTitleText = computed(() => props.isEditing ? 'Edit your movie' : 'Upload a movie');

watch(() => form.video_file, () => {
  errors.video_file = '';
}, { immediate: true });

watch(() => form.title, () => {
  errors.title = '';
});

function handleFileChange(event) {
  form.video_file = event.target.files[0];
}

async function submitForm() {
  errors.video_file = '';
  errors.title = '';

  if(form.video_file == null) errors.video_file = 'Requires a file';
  if(form.title === '') errors.title = 'Requires a title';

  const hasErrors = Object.values(errors).some((msg) => msg !== '');

  if (hasErrors) return;

  if (props.isEditing) {
    form.id = props.movie.id;
    await store.dispatch('updateMovie', form);
  } else await store.dispatch('createMovie', form);
  emit('formSubmit');
}

function removeSelectedFileHandler() {
  form.video_file = null
  if (videoInput.value) {
    videoInput.value.value = null
  }
}

</script>
<template>
  <div class="editor-wrapper">
    <h1>{{pageTitleText}}</h1>

    <div class="form-group">
      <label for="video_file">Video File</label>
      <input
        id="video_file"
        type="file"
        accept="video/*"
        @change="handleFileChange"
        ref="videoInput"
      />
      <small v-if="errors.video_file" class="error">{{errors.video_file}}</small>
      <div v-if="form.video_file" class="video-preview">
        <VideoPlayer :video-src="form.video_file" />

      </div>
      <button
        v-if="form.video_file"
        type="button"
        class="remove-button"
        @click="removeSelectedFileHandler"
      >
        Remove
      </button>
      <small v-if="props.movie?.video_file" >Current: {{ props.movie?.video_file }}</small>
    </div>

    <form class="form-body" @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">Title</label>
        <input id="title" v-model="form.title" placeholder="Enter a title..." type="text" />
        <small v-if="errors.title" class="error">{{errors.title}}</small>
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="form.description" placeholder="Add a description..." rows="4" />
      </div>
      <div class="buttons">
        <button v-if="isEditing" class="back" @click="$emit('close')">Back</button>
        <button v-else class="close" @click="$emit('close')">Close</button>
        <button type="submit">Save</button>
      </div>
    </form>
  </div>
</template>
<style scoped lang="scss">
h1 {
  text-align: center;
}

.editor-wrapper {
  padding: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
}

.form-body {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  label {
    font-weight: 600;
  }

  input[type="text"],
  textarea {
    padding: 0.6rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
  }

  input[type="file"] {
    font-size: 0.9rem;
  }

  small {
    color: #777;

    &.error {
      color: var(--nf-red-300);
    }
  }
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 1.5rem;

  button {
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    align-self: flex-start;
    color: black;
    background-color: white;
    &:hover {
      background-color: #ccc;
    }
  }

  .close {
    background-color: var(--nf-red-300);
    color: white;
    &:hover {
      background-color: var(--nf-red-200);
    }
  }

  button[type='submit'] {
    background-color: #3b82f6;
    color: white;
    &:hover {
      background-color: #2563eb;
    }
  }
}




</style>
