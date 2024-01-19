# Performance

## Lazy Loading

Lazy loading is a strategic approach to identify resources as non-blocking (non-critical) and load them only when necessary. This method aims to reduce the length of the critical rendering path, leading to shorter page load times.

While code splitting is primarily performed on the routes level, it can also be implemented for other parts of the application that can be lazy loaded.

[Example Code](../src/routes/public.tsx)

## Component and state optimizations

Efficient component and state optimizations focus on minimizing unnecessary re-renders:

- **Split Global State**: Divide the global state into multiple stores based on where it is used.

- **Proximity of State**: Keep the state as close as possible to where it is being used.

- **State Initializer Function**: For expensive computations, use the state initializer function instead of executing it directly. For example:

```javascript
// Instead of this, which would be executed on every re-render:
const [state, setState] = useState(myExpensiveFn());

// Prefer this, which is executed only once:
const [state, setState] = useState(() => myExpensiveFn());
```

## Image optimizations

Consider the following image optimization strategies:

- **Lazy Loading**: Implement lazy loading for images that are not initially in the viewport, deferring their loading until they come into view.

- **Modern Image Formats**: Utilize modern image formats such as WEBP to enhance image loading speed.

- **srcset Attribute**: Use the srcset attribute to load the most optimal image based on the client's screen size.

## Web vitals

Google considers web vitals when indexing websites. Keep track of web vitals scores using tools like [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) and [Pagespeed Insights](https://pagespeed.web.dev/).

Monitoring and improving web vitals are crucial for ensuring a positive user experience and search engine optimization.
