import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import './footer.scss';
import { LitComponent } from '../../LitComponent';

@customElement('fox-footer')
export class Footer extends LitComponent {
	constructor() {
		super();
	}

	protected render() {
		return html`
			<footer class="footer">
				<div class="container">
					<div class="footer-content">
						<div class="contacts">
							<div class="mb-3">
								<img src="../../../icons/footer/logo-orange.svg" alt="logo" />
							</div>
							<div class="mb-2">Lorem ipsum dolor sit amet consectetur consectetur</div>
							<div class="mb-2">Call us : 8956 3254 7887</div>

							<div class="social-links">
								<a class="social-link instagram"></a>
								<a class="social-link telegram"></a>
								<a class="social-link twitter"></a>
							</div>
						</div>

						<div class="footer-info">
							<div class="info-collection">
								<div class="collection-title">Shop</div>
								<div class="collection-item">Lorem ipsum</div>
								<div class="collection-item">Lorem ipsum</div>
							</div>

							<div class="info-collection">
								<div class="collection-title">Products</div>
								<div class="collection-item">Lorem ipsum</div>
								<div class="collection-item">Lorem ipsum</div>
							</div>

							<div class="info-collection">
								<div class="collection-title">Collection</div>
								<div class="collection-item">Lorem ipsum</div>
								<div class="collection-item">Lorem ipsum</div>
								<div class="collection-item">Lorem ipsum</div>
								<div class="collection-item">Lorem ipsum</div>
							</div>

							<div class="info-collection">
								<div class="collection-title">Weekly updates</div>
								<div class="collection-item">Lorem ipsum</div>
								<div class="collection-item">Lorem ipsum</div>
								<div class="collection-item">Lorem ipsum</div>
								<div class="collection-item">Lorem ipsum</div>
								<div class="collection-item">Lorem ipsum</div>
							</div>

							<div class="info-collection">
								<div class="collection-title">About us</div>
								<div class="collection-item">Lorem ipsum</div>
								<div class="collection-item">Lorem ipsum</div>
								<div class="collection-item">Lorem ipsum</div>
							</div>
						</div>
					</div>

					<div class="copyrights">Storelogo, 2023 All rights reserved</div>
				</div>
			</footer>
		`;
	}
}
