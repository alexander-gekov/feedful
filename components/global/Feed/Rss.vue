<template>
  <FeedHeader
    :name="name"
    :icon="icon"
    :image="`https://logo.clearbit.com/${url}`"
    :url="url"
    @refresh="refresh"
    @delete="$emit('delete')"
  />
  <div class="flex-1 overflow-auto">
    <FeedLoading v-if="pending" />
    <div v-else>
      <div
        v-for="(post, id) in feed.items"
        :key="id"
        class="px-3 py-4 group hover:bg-gray-50"
      >
        <a :href="post.link" target="_blank">
          <p class="font-semibold text-base text-gray-900 break-words mb-2">
            {{ post.title }}
          </p>
          <div
            class="prose-sm prose-img:rounded-lg prose-img:ring-1 prose-img:ring-gray-200 line-clamp-6 prose-p:text-gray-600"
            v-html="post.content || post.description"
          ></div>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  feedUrl: string;
  name: string;
  url: string;
  icon: string;
}>();
const {
  data: feed,
  pending,
  refresh,
} = await useFetch("/api/feed/rss", {
  params: {
    feedUrl: props.url,
  },
  server: false,
  lazy: true,
});

function removeClassesAndStyles(htmlString: string): string {
  // Remove class attributes
  const withoutClasses = htmlString.replace(/ class="[^"]*"/g, '');

  // Remove inline style attributes
  const withoutStyles = withoutClasses.replace(/ style="[^"]*"/g, '');

  return withoutStyles;
}
</script>
