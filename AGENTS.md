<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Uploaded site photos use optimized responsive WebP variants and a deliberate static mirror in `public/img`; independent Vercel deployments cannot rely on Lovable's asset-serving endpoint.
- Use WorkshopPhoto for below-the-fold workshop photos so responsive sources, lazy loading, decoding, and intrinsic dimensions remain consistent.
- Content photos preserve their intrinsic aspect ratio at every viewport, with portfolio captions in normal flow so they never obscure the photos; secondary page covers retain their stacked mobile layout, while final CTA banners use an overlaid background at every viewport to keep image and text integrated.
- Quote requests are client-side handoffs to the selected email or WhatsApp app, with validated, URL-encoded fields and no simulated send or unsupported attachment picker.
