<template>
  <v-row>
    <v-col md="4" sm="6" offset-md="2" class="v-card--form">
      <v-form v-model="flags.valid" ref="form" lazy-validation @submit.prevent="submit()">
        <v-card tile flat>
          <v-card-text>
            <v-date-picker
              full-width
              no-title
              range
              v-model="_date"
              :prev-icon="icons.arrowLeft"
              :next-icon="icons.arrowRight"
              :allowed-dates="dateIsValid"
              :landscape="flags.landscape"
              :locale="i18n.locale"
              :max="fields.dateRange.to"
              :min="fields.dateRange.from"
              @click:date="fetchEntities()"
            ></v-date-picker>

            <v-text-field
              v-model="_date"
              :label="fields.checkInDate.label"
              :prepend-icon="fields.checkInDate.icon"
              :hint="fields.checkInDate.hint"
              disabled
              outlined
              persistent-hint
              readonly
              dense
              required
              v-show="fields.checkInDate.show"
            ></v-text-field>

            <v-select
              v-model="_timeCheckIn"
              :items="fields.timeCheckIn.range"
              :rules="fields.timeCheckIn.rules"
              :label="fields.timeCheckIn.label"
              :prepend-icon="fields.timeCheckIn.icon"
              outlined
              required
              dense
              hide-details
              v-on:change="fetchEntities()"
            ></v-select>

            <v-select
              class="mt-6"
              v-model="_timeCheckOut"
              :items="fields.timeCheckOut.range"
              :rules="fields.timeCheckOut.rules"
              :label="fields.timeCheckOut.label"
              :prepend-icon="fields.timeCheckOut.icon"
              outlined
              required
              dense
              hide-details
              v-on:change="fetchEntities()"
            ></v-select>

            <v-select
              v-model="fields.productSelected.value"
              :items="_productSelected"
              item-value="id"
              item-text="text"
              :label="fields.productSelected.label"
              :prepend-icon="fields.productSelected.icon"
              :hint="fields.productSelected.hint"
              chips
              multiple
              required
              @change="updateSelected()"
            ></v-select>

            <v-text-field
              class="mt-2"
              v-model="_adults"
              :label="fields.adults.label"
              :prepend-icon="fields.adults.icon"
              :min="fields.adults.min"
              :max="fields.adults.max"
              :value="fields.adults.default"
              outlined
              dense
              required
              type="number"
            ></v-text-field>

            <v-text-field
              v-model="_kids"
              :label="fields.kids.label"
              :prepend-icon="fields.kids.icon"
              :min="fields.kids.min"
              :max="fields.kids.max"
              :value="fields.kids.default"
              outlined
              dense
              required
              type="number"
            ></v-text-field>

            <v-text-field
              v-model="_note"
              :label="fields.note.label"
              :prepend-icon="fields.note.icon"
              :max="fields.note.max"
              :counter="fields.note.max"
              outlined
              dense
            ></v-text-field>
          </v-card-text>
        </v-card>
        <v-card tile flat>
          <v-card-title>{{ labels.formFilterTitle }}</v-card-title>
          <v-card-subtitle>{{ labels.formFilterCaption }}</v-card-subtitle>
          <v-card-text>
            <v-autocomplete
              v-model="_search"
              :items="fields.search.list"
              :prepend-icon="fields.search.icon"
              :label="fields.search.label"
              outlined
              dense
              @change="fetchEntities()"
            ></v-autocomplete>

            <v-select
              v-model="fields.sortBy.value"
              :items="fields.sortBy.list"
              :prepend-icon="fields.sortBy.icon.alpha"
              :label="fields.sortBy.label"
              item-value="value"
              item-text="text"
              outlined
              dense
              @change="fetchEntities()"
            ></v-select>

            <v-select
              v-model="fields.servicesSelected.value"
              :items="fields.servicesSelected.selected"
              item-value="id"
              item-text="text"
              :label="fields.servicesSelected.label"
              :prepend-icon="fields.servicesSelected.icon"
              :hint="fields.servicesSelected.hint"
              chips
              multiple
              dense
              @change="fetchEntities()"
            ></v-select>

            <v-select
              v-model="fields.optionalsSelected.value"
              :items="fields.optionalsSelected.selected"
              item-value="id"
              item-text="text"
              :label="fields.optionalsSelected.label"
              :prepend-icon="fields.optionalsSelected.icon"
              :hint="fields.optionalsSelected.hint"
              chips
              multiple
              dense
              @change="fetchEntities()"
            ></v-select>

            <v-select
              v-model="fields.tagSelected.value"
              :items="fields.tagSelected.selected"
              item-value="id"
              item-text="text"
              :label="fields.tagSelected.label"
              :prepend-icon="fields.tagSelected.icon"
              :hint="fields.tagSelected.hint"
              chips
              multiple
              dense
              @change="fetchEntities()"
            ></v-select>

            <v-range-slider
              v-model="fields.priceRange.range"
              :max="fields.priceRange.max"
              :min="fields.priceRange.min"
              hide-details
              class="align-center"
              @change="fetchEntities()"
            >
              <template v-slot:prepend>
                <v-text-field
                  :value="fields.priceRange.range[0]"
                  :prepend-icon="fields.priceRange.icon"
                  type="number"
                  outlined
                  dense
                ></v-text-field>
              </template>
              <template v-slot:append>
                <v-text-field
                  :value="fields.priceRange.range[1]"
                  type="number"
                  outlined
                  dense
                ></v-text-field>
              </template>
            </v-range-slider>
          </v-card-text>
        </v-card>
        <v-card tile flat>
          <v-card-title>{{ labels.formSignUpTitle }}</v-card-title>
          <v-card-subtitle>{{ labels.formSignUpCaption }}</v-card-subtitle>
          <v-card-text>
            <v-text-field
              v-model="_firstName"
              :rules="fields.firstName.rules"
              :counter="fields.firstName.maxlength"
              :label="fields.firstName.label"
              :prepend-icon="fields.firstName.icon"
              outlined
              required
              dense
            ></v-text-field>

            <v-text-field
              v-model="_lastName"
              :rules="fields.lastName.rules"
              :counter="fields.lastName.maxlength"
              :label="fields.lastName.label"
              :prepend-icon="fields.lastName.icon"
              outlined
              required
              dense
            ></v-text-field>

            <v-text-field
              v-model="_email"
              :rules="fields.email.rules"
              :label="fields.email.label"
              :prepend-icon="fields.email.icon"
              outlined
              required
              dense
            ></v-text-field>

            <template v-if="fields.link">
              <div v-for="(link, i) in fields.link" :key="i">
                <v-checkbox v-model="link.checkbox" :rules="link.rules">
                  <template v-slot:label>
                    <div @click.stop="">
                      {{ link.text }} <a v-bind:href="link.href">{{ link.label }}</a>
                    </div>
                  </template>
                </v-checkbox>
              </div>
            </template>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn text outlined :color="colors.secondary" @click="reset()">
              {{ fields.reset.label }}
            </v-btn>
            <v-btn text outlined :color="colors.primary" :disabled="_disable" @click="submit()" type="submit">
              {{ fields.submit.label }}
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-dialog v-model="dialog.show" persistent max-width="320">
          <v-card>
            <v-card-title class="headline">{{ dialog.title }}</v-card-title>
            <v-card-text v-html="dialog.text"></v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="dialog.show = false">
                {{ dialog.actions.label }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-form>
    </v-col>
    <v-col class="v-card--list" md="4" sm="6" v-if="!_products.length">
      {{ labels.notAvaible }}
    </v-col>
    <v-col class="v-card--list" md="4" sm="6" v-if="_products.length">
      <v-card elevation="4" tile class="mb-4" v-for="(product, i) in _products" :key="i">
        <template v-if="product.id">
          <v-carousel v-if="product._media" height="auto">
            <v-carousel-item v-for="(media, m) in product._media" :key="m" :src="media.url"></v-carousel-item>
          </v-carousel>
          <v-card-title>{{ product._content.name }}</v-card-title>
          <v-card-subtitle>{{ product._content.short_description }}</v-card-subtitle>
          <v-list dense class="no-line">
            <v-list-item-group>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ product._ecommerce.currency }} {{ product._ecommerce.price_current }} {{ product._ecommerce.unit }}
                  </v-list-item-title>
                  <v-list-item-subtitle v-if="product._ecommerce.price_reduction">
                    <span class="text-decoration-line-through mr-2">
                      {{ product._ecommerce.currency }} {{ product._ecommerce.price_original }} {{ product._ecommerce.unit }}
                    </span>
                    <v-chip small outlined class="font-weight-bold" :text-color="colors.primary">
                      {{ product._ecommerce.price_reduction }} <v-icon small>{{ icons.discount }}</v-icon>
                    </v-chip>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle v-html="product._ecommerce.tax"></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action @click="addOrRmoveProduct(product)">
                  <v-btn v-if="!product._selected" fab small :color="colors.primary">
                    <v-icon>{{ icons.addCart }}</v-icon>
                  </v-btn>
                  <v-btn v-else fab small dark :color="colors.secondary">
                    <v-icon>{{ icons.removeItem }}</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-expansion-panels flat>
            <v-expansion-panel>
              <v-expansion-panel-header :expand-icon="icons.arrowDown"></v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-divider></v-divider>

                <v-list dense class="no-line" v-if="product._notices.length">
                  <v-subheader>
                    <v-icon small left>{{ icons.info }}</v-icon> {{ labels.notices.toUpperCase() }}
                  </v-subheader>
                  <v-list-item v-for="(notice, n) in product._notices" :key="n">
                    <v-list-item-content>
                      <v-list-item-title>{{ notice.content.name }}</v-list-item-title>
                      <v-list-item-subtitle>
                        {{ labels.dateFrom}} {{ notice.calendar.date_start }}
                        {{ labels.dateTo}} {{ notice.calendar.date_end }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle v-html="notice.content.description"></v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon :color="colors.primary">
                        <v-icon>{{ icons.info }}</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>

                <template v-if="product._attributes.length">
                  <v-list dense v-for="(group, g) in product._attributes" :key="g">
                    <v-subheader>
                      <v-icon small left>{{ icons.description }}</v-icon> {{ group.name.toUpperCase() }}
                    </v-subheader>
                    <v-list-item-group v-if="group.attributes.length">
                      <v-list-item v-for="(attribute, a) in group.attributes" :key="a">
                        <v-list-item-content>
                          <v-list-item-title>{{ attribute.name }}</v-list-item-title>
                          <v-list-item-subtitle v-for="(data, v) in attribute.values" :key="v">
                            {{ data.value }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </template>

                <v-list dense class="no-line" v-if="product._tags.length">
                  <v-subheader>
                    <v-icon small left>{{ icons.addCheck }}</v-icon> {{ labels.features.toUpperCase() }}
                  </v-subheader>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle>
                        <v-chip class="mt-1 mr-1" small outlined :color="colors.primary" v-for="(tag, t) in product._tags" :key="t">
                          <v-icon left small>{{ icons.check }}</v-icon> {{ tag.name }}
                        </v-chip>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>

                <v-list dense class="no-line" v-if="product._services.length">
                  <v-subheader>
                    <v-icon left small>{{ icons.settings }}</v-icon> {{ labels.services.toUpperCase() }}
                  </v-subheader>
                  <v-expansion-panels flat>
                    <v-expansion-panel v-for="(service, s) in product._services" :key="s">
                      <v-expansion-panel-header class="px-4 py-1 panel-header-1 text-subtitle-2">
                        {{ service.content.name }}
                      </v-expansion-panel-header>
                      <v-expansion-panel-content color="grey lighten-4">
                        <v-divider></v-divider>
                        <v-list-item-group v-if="service.notices">
                          <v-list-item v-for="(notices, sn) in service.notices" :key="sn">
                            <v-list-item-content>
                              <v-list-item-title>{{ notices.content.name }}</v-list-item-title>
                              <v-list-item-subtitle>
                                <v-icon small>{{ icons.dateRange }}</v-icon>
                                {{ notices.calendar.date_start }} - {{ notices.calendar.date_start }}
                              </v-list-item-subtitle>
                              <v-list-item-subtitle v-html="notices.content.description"></v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                              <v-btn icon :color="colors.primary">
                                <v-icon>{{ icons.info }}</v-icon>
                              </v-btn>
                            </v-list-item-action>
                          </v-list-item>
                        </v-list-item-group>
                        <v-list-item-group v-if="service.content.description">
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title>{{ labels.description }}</v-list-item-title>
                              <v-list-item-subtitle>
                                <v-icon small>{{ icons.dateRange }}</v-icon>
                                {{ service.calendar.date_start }} - {{ service.calendar.date_end }}
                              </v-list-item-subtitle>
                              <v-list-item-subtitle v-html="service.content.description"></v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-group>
                        <v-list-item-group v-if="service.content.name">
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title>{{ labels.note }}</v-list-item-title>
                              <v-list-item-subtitle>{{ service.content.name }}</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-group>
                        <v-list-item-group v-if="service.ecommerce.price_current">
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title>{{ labels.price }}</v-list-item-title>
                              <v-list-item-subtitle v-if="!service.ecommerce.price_reduction">
                                {{ service.ecommerce.currency }} {{ service.ecommerce.price_current }} {{ service.ecommerce.unit }}
                              </v-list-item-subtitle>
                              <v-list-item-subtitle v-else>
                                <span>
                                {{ service.ecommerce.currency }} {{ service.ecommerce.price_current }} {{ service.ecommerce.unit }}
                                </span>
                                <span class="text-decoration-line-through mr-2">
                                {{ service.ecommerce.currency }} {{ service.ecommerce.price_original }} {{ service.ecommerce.unit }}
                                </span>
                                <v-chip small outlined class="font-weight-bold" :text-color="colors.primary">
                                  {{ service.ecommerce.price_reduction }} <v-icon small>{{ icons.discount }}</v-icon>
                                </v-chip>
                              </v-list-item-subtitle>
                              <v-list-item-subtitle v-html="service.ecommerce.tax"></v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-group>
                        <v-divider></v-divider>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-list>

                <v-list dense class="no-line" v-if="product._optionals">
                  <v-subheader>
                    <v-icon left small>{{ icons.settings }}</v-icon> {{ labels.optionals.toUpperCase() }}
                  </v-subheader>
                  <v-expansion-panels flat>
                    <v-expansion-panel v-for="(optional, o) in product._optionals" :key="o">
                      <v-expansion-panel-header class="px-4 py-1 panel-header-1 text-subtitle-2">
                        {{ optional.content.name }}
                      </v-expansion-panel-header>
                      <v-expansion-panel-content color="grey lighten-4">
                        <v-divider></v-divider>
                        <v-list-item-group v-if="optional.notices">
                          <v-list-item v-for="(notices, on) in optional.notices" :key="on">
                            <v-list-item-content>
                              <v-list-item-title>{{ notices.content.name }}</v-list-item-title>
                              <v-list-item-subtitle>
                                <v-icon small>{{ icons.dateRange }}</v-icon>
                                {{ notices.calendar.date_start }} - {{ notices.calendar.date_start }}
                              </v-list-item-subtitle>
                              <v-list-item-subtitle v-html="notices.content.description"></v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                              <v-btn icon :color="colors.primary">
                                <v-icon>{{ icons.info }}</v-icon>
                              </v-btn>
                            </v-list-item-action>
                          </v-list-item>
                        </v-list-item-group>
                        <v-list-item-group v-if="optional.content.description">
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title>{{ labels.description }}</v-list-item-title>
                              <v-list-item-subtitle>
                                <v-icon small>{{ icons.dateRange }}</v-icon>
                                {{ optional.calendar.date_start }} - {{ optional.calendar.date_end }}
                              </v-list-item-subtitle>
                              <v-list-item-subtitle v-html="optional.content.description"></v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-group>
                        <v-list-item-group v-if="optional.content.name">
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title>{{ labels.note }}</v-list-item-title>
                              <v-list-item-subtitle>{{ optional.content.name }}</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-group>
                        <v-list-item-group v-if="optional.ecommerce.price_current">
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title>{{ labels.price }}</v-list-item-title>
                              <v-list-item-subtitle v-if="!optional.ecommerce.price_reduction">
                                {{ optional.ecommerce.currency }} {{ optional.ecommerce.price_current }} {{ optional.ecommerce.unit }}
                              </v-list-item-subtitle>
                              <v-list-item-subtitle v-else>
                                <span>
                                {{ optional.ecommerce.currency }} {{ optional.ecommerce.price_current }} {{ optional.ecommerce.unit }}
                                </span>
                                <span class="text-decoration-line-through mr-2">
                                {{ optional.ecommerce.currency }} {{ optional.ecommerce.price_original }} {{ optional.ecommerce.unit }}
                                </span>
                                <v-chip small outlined class="font-weight-bold" :text-color="colors.primary">
                                  {{ optional.ecommerce.price_reduction }} <v-icon small>{{ icons.discount }}</v-icon>
                                </v-chip>
                              </v-list-item-subtitle>
                              <v-list-item-subtitle v-html="optional.ecommerce.tax"></v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-group>
                        <v-divider></v-divider>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-list>

                <v-list dense class="no-line" v-if="product._content.note">
                  <v-subheader>
                    <v-icon small left>{{ icons.eventNote }}</v-icon> {{ labels.note.toUpperCase() }}
                  </v-subheader>
                  <v-list-item-group>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>{{ labels.note }}</v-list-item-title>
                        <v-list-item-subtitle>{{ product._content.note }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>

              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </template>
      </v-card>
      <v-card flat>
        <v-card-actions>
          <v-spacer></v-spacer>{{ labels.nResults }}: {{ _productCount }}</v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.v-card--list >>> .v-card .v-expansion-panel-content__wrap {
  padding: 0px !important;
}

.v-card--list >>> .no-line .v-list-item__subtitle {
  white-space: initial;
  -webkit-line-clamp: none;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}

.v-card--list >>> .no-line .v-list-item__title {
  white-space: normal;
}

.v-card--list >>> .v-expansion-panel-header.panel-header-1 {
  min-height: 24px;
}

.v-card--list >>> .v-expansion-panel--active > .v-expansion-panel-header.panel-header-1 {
  min-height: 24px;
}

.v-card--form >>> .v-card__title,
.v-card--list >>> .v-card__title {
  word-break: break-word;
}
</style>

<script>
import { COLORS } from '../common/colors.js'
import * as FORM from '../common/form'
import { API } from '../common/http'
import { ICONS } from '../common/icons'
import { I18N } from '../common/locale'
import { Entity, EntityAttributes } from './models/entity'

export default {
  created () {
    this.i18n.language = I18N.getIso().substring(0, 2).toLocaleLowerCase()
    this.fetchAppData()
  },
  data () {
    return {
      dialog: FORM.DIALOG(false),
      i18n: {
        language: '',
        locale: I18N.getIso(),
        timezone: ''
      },
      flags: {
        loading: {
          app: false,
          entities: false,
          order: false
        },
        valid: false,
        landscape: false
      },
      fields: {
        date: [],
        dateRange: FORM.CALENDAR_RANGE,
        checkInDate: FORM.CHECKIN_DATE,
        timeCheckIn: FORM.CHECKIN_TIME,
        timeCheckOut: FORM.CHECKOUT_TIME,
        productSelected: FORM.PRODUCT_SELECTED,
        servicesSelected: FORM.SERVICES_SELECTED,
        optionalsSelected: FORM.OPTIONALS_SELECTED,
        tagSelected: FORM.TAGS_SELECTED,
        priceRange: FORM.RANGE_NUMBER,
        adults: FORM.ADULTS,
        kids: FORM.KIDS,
        note: FORM.NOTE,
        firstName: FORM.FIRST_NAME,
        lastName: FORM.LAST_NAME,
        email: FORM.EMAIL,
        search: FORM.FILTER_SEARCH,
        sortBy: FORM.SORT_BY,
        reset: FORM.RESET,
        submit: FORM.SUBMIT,
        link: FORM.CHECKBOX_PRIVACY
      },
      labels: {
        description: I18N.load().common.description,
        confirm: I18N.load().common.confirm,
        note: I18N.load().common.note,
        notAvaible: I18N.load().common.notAvaible,
        signin: I18N.load().common.signin,
        productsNotSelected: I18N.load().validation.error.productsNotSelected,
        features: I18N.load().common.features,
        includedServices: I18N.load().common.includedServices,
        dateFrom: I18N.load().common.dateFrom,
        dateTo: I18N.load().common.dateTo,
        notices: I18N.load().common.notices,
        tag: I18N.load().common.tag,
        services: I18N.load().common.services,
        optionals: I18N.load().common.optionals,
        price: I18N.load().common.price,
        formBookingTitle: I18N.load().form.booking.title,
        formBookingCaption: I18N.load().form.booking.caption,
        formFilterTitle: I18N.load().form.filter.title,
        formFilterCaption: I18N.load().form.filter.caption,
        formSignUpTitle: I18N.load().form.signUp.title,
        formSignUpCaption: I18N.load().form.signUp.caption,
        nResults: I18N.load().common.nRecord
      },
      icons: {
        arrowDown: ICONS.arrowDown,
        arrowLeft: ICONS.arrowLeft,
        arrowRight: ICONS.arrowRight,
        addCart: ICONS.addCart,
        removeItem: ICONS.removeItem,
        discount: ICONS.discount,
        check: ICONS.accept,
        info: ICONS.info,
        description: ICONS.description,
        addCheck: ICONS.addCheck,
        eventNote: ICONS.eventNote,
        settings: ICONS.settings,
        dateRange: ICONS.dateRange
      },
      colors: {
        primary: COLORS.primary,
        secondary: COLORS.secondary
      },
      products: []
    }
  },
  computed: {
    _disable: {
      get () {
        if (!this.fields.productSelected.value.length) {
          return true
        }

        if (!this._firstName.length) {
          return true
        }

        if (!this._lastName.length) {
          return true
        }

        if (!this._email.length) {
          return true
        }

        return false
      }
    },
    _language: {
      get () {
        return this.i18n.language || ''
      },
      set (v) {
        this.i18n.language = (v || I18N.getIso())
      }
    },
    _loadingApp: {
      get () {
        return this.flags.loading.app
      },
      set (v) {
        this.flags.loading.app = v || false
      }
    },
    _loadingEntities: {
      get () {
        return this.flags.loading.entities
      },
      set (v) {
        this.flags.loading.entities = v || false
      }
    },
    _loadingOrder: {
      get () {
        return this.flags.loading.order
      },
      set (v) {
        this.flags.loading.order = v || false
      }
    },
    _date: {
      get () {
        return this.fields.date || []
      },
      set (v) {
        this.fields.date = (v || [])
      }
    },
    _datetimeStart: {
      get () {
        const dateStart = this._date[0] || this.getDateIsoFormat()
        return `${dateStart}T${this._timeCheckIn}`
      }
    },
    _datetimeEnd: {
      get () {
        const dateStart = this._date[0] || this.getDateIsoFormat()
        const dateEnd = this._date[1] || dateStart
        return `${dateEnd}T${this._timeCheckOut}`
      }
    },
    _timeCheckIn: {
      get () {
        return this.fields.timeCheckIn.value || this.fields.timeCheckIn.default
      },
      set (v) {
        this.fields.timeCheckIn.value = (v || this.fields.timeCheckIn.default)
      }
    },
    _timeCheckOut: {
      get () {
        return this.fields.timeCheckOut.value || this.fields.timeCheckOut.default
      },
      set (v) {
        this.fields.timeCheckOut.value = (v || this.fields.timeCheckOut.default)
      }
    },
    _productCount: {
      get () {
        return this._products.length || 0
      }
    },
    _products: {
      get () {
        return this.products || []
      },
      set (v) {
        this.products = (v || [])
      }
    },
    _productSelected: {
      get () {
        return this.fields.productSelected.selected || []
      },
      set (v) {
        if (typeof v !== 'object') {
          this.fields.productSelected.value = []
          this.fields.productSelected.selected = []
          return
        }
        if (this.fields.productSelected.value.filter(o => o.id === v.id).length === 0) {
          this.fields.productSelected.value.push(v)
        }
        if (this.fields.productSelected.selected.filter(o => o.id === v.id).length === 0) {
          this.fields.productSelected.selected.push(v)
        }
      }
    },
    _adults: {
      get () {
        return this.fields.adults.value || 0
      },
      set (v) {
        this.fields.adults.value = (v || this.fields.adults.default || 1)
      }
    },
    _kids: {
      get () {
        return this.fields.kids.value || 0
      },
      set (v) {
        this.fields.kids.value = (v || this.fields.kids.default || 0)
      }
    },
    _note: {
      get () {
        return this.fields.note.value || ''
      },
      set (v) {
        this.fields.note.value = (v || '')
      }
    },
    _firstName: {
      get () {
        return this.fields.firstName.value || ''
      },
      set (v) {
        this.fields.firstName.value = (v || '')
      }
    },
    _lastName: {
      get () {
        return this.fields.lastName.value || ''
      },
      set (v) {
        this.fields.lastName.value = (v || '')
      }
    },
    _email: {
      get () {
        return this.fields.email.value || ''
      },
      set (v) {
        this.fields.email.value = (v || '')
      }
    },
    _search: {
      get () {
        return this.fields.search.value || ''
      },
      set (v) {
        this.fields.search.value = (v || '')
      }
    },
    _sortBy: {
      get () {
        return this.fields.sortBy.value || ''
      },
      set (v) {
        this.fields.sortBy.value = (v || '')
      }
    },
    _servicesSelected: {
      get () {
        return this.fields.servicesSelected.value || []
      },
      set (v) {
        this.fields.servicesSelected.value = (v || [])
      }
    },
    _optionalsSelected: {
      get () {
        return this.fields.optionalsSelected.value || []
      },
      set (v) {
        this.fields.optionalsSelected.value = (v || [])
      }
    },
    _tagSelected: {
      get () {
        return this.fields.tagSelected.value || []
      },
      set (v) {
        this.fields.tagSelected.value = (v || [])
      }
    },
    _priceRange: {
      get () {
        return this.fields.priceRange.range || []
      },
      set (v) {
        this.fields.priceRange.range = (v || [])
      }
    },
    _page: {
      get () {
        const url = new URL(window.location.href)
        return url.searchParams.get('page') || 1
      }
    }
  },
  methods: {
    dateNow () {
      return new Date().toISOString().slice(0, 10)
    },
    getLocale () {
      const IntlResolve = Intl.DateTimeFormat().resolvedOptions()
      return {
        locale: IntlResolve.locale,
        timeZone: IntlResolve.timeZone
      }
    },
    getFormData () {
      return {
        ...this.getLocale(),
        timestamp: Date.now(),
        firstName: this._firstName,
        lastName: this._lastName,
        email: this._email,
        adults: this._adults,
        kids: this._kids,
        note: this._note,
        entities: this._productSelected,
        date_start: this._datetimeStart,
        date_end: this._datetimeEnd
      }
    },
    getFormFilter () {
      return {
        ...this.getLocale(),
        attributes: [
          {
            field: 'adults',
            value: this._adults,
            operator: EntityAttributes.HIGHER_OR_EQUAL
          },
          {
            field: 'kids',
            value: this._kids,
            operator: EntityAttributes.HIGHER_OR_EQUAL
          }
        ],
        dateRange: {
          from: this._datetimeStart,
          to: this._datetimeEnd
        },
        sort: this._sortBy,
        page: this._page,
        per_page: process.env.VUE_APP_API_PER_PAGE,
        name: this._search,
        price: this._priceRange,
        services: this._servicesSelected,
        optionals: this._optionalsSelected,
        tags: this._tagSelected
      }
    },
    getDateIsoFormat (day = null) {
      const date = day ? new Date(day) : new Date()
      return date.toISOString().split('T')[0]
    },
    fetchAppData () {
      let t = null
      if (this._loadingApp) {
        return
      }
      this._loadingApp = true
      t = setTimeout(() => {
        API.fetchAppData()
          .then((r) => {
            this.fields.timeCheckIn.range = r.time.checkIn
            this.fields.timeCheckOut.range = r.time.checkOut
            this._timeCheckIn = r.time.checkIn[0]
            this._timeCheckOut = r.time.checkOut[0]
            this.fields.dateRange.notAvaibleDate = r.calendar.notAvaibleDate
            this.fields.dateRange.from = r.calendar.from
            this.fields.dateRange.to = r.calendar.to
            this.fields.search.list = r.entities.rentals.map(o => { return { id: o.entity_id, text: o.entity_title } })
            this.fields.servicesSelected.selected = r.entities.services.map(o => { return { id: o.entity_id, text: o.entity_title } })
            this.fields.optionalsSelected.selected = r.entities.optionals.map(o => { return { id: o.entity_id, text: o.entity_title } })
            this.fields.tagSelected.selected = r.entities.features.map(o => { return { id: o.entity_id, text: o.entity_title } })
            this.updateSelected()
            this.fetchEntities()
            this._loadingApp = false
            clearTimeout(t)
            t = null
          }).catch((e) => {
            this.showDialogError(e)
            this._loadingApp = false
            clearTimeout(t)
            t = null
          })
      }, 100)
    },
    fetchEntities () {
      let t = null
      if (this._loadingEntities) {
        return
      }
      this._loadingEntities = true
      const data = this.getFormFilter()
      t = setTimeout(() => {
        API.filterEntities(data)
          .then((r) => {
            this._products = r.map(e => new Entity(e))
            this.updateSelected()
            this._loadingEntities = false
            clearTimeout(t)
            t = null
          }).catch((e) => {
            this.showDialogError(e)
            this._loadingEntities = false
            clearTimeout(t)
            t = null
          })
      }, 500)
    },
    updateSelected () {
      const ids = this.fields.productSelected.value.map(o => { return o.id })
      for (const i in this._products) {
        if (ids.includes(this._products[i].id)) {
          this._products[i].selected = true
        } else {
          this._products[i].selected = false
        }
      }
    },
    addOrRmoveProduct (o) {
      this.fields.productSelected.value = []
      this.fields.productSelected.selected = []
      for (const i in this._products) {
        if (this._products[i]._id === o._id) {
          this._products[i]._selected = !this._products[i]._selected
        }
        if (this._products[i]._selected) {
          this._productSelected = {
            id: this._products[i]._id,
            text: this._products[i]._content.name
          }
        }
      }
    },
    dateIsValid (v) {
      if (this.fields.dateRange.notAvaibleDate.includes(v) === true) {
        return true
      }
      return (new Date().getTime() <= new Date(v).getTime())
    },
    showDialogError (e = null) {
      this.dialog = FORM.DIALOG(
        true,
        I18N.load().common.error,
        e || I18N.load().validation.error.requiredFields,
        I18N.load().common.ok
      )
    },
    showDialogSuccess (d = null) {
      this.dialog = FORM.DIALOG(
        true,
        I18N.load().common.success,
        d.text || '',
        I18N.load().common.ok
      )
    },
    validate () {
      return this.$refs.form.validate()
    },
    resetValidation () {
      return this.$refs.form.resetValidation()
    },
    reset () {
      this._date = []
      this._timeCheckIn = this.fields.timeCheckIn.range[0] || null
      this._timeCheckOut = this.fields.timeCheckOut.range[0] || null
      this._firstName = null
      this._lastName = null
      this._email = null
      this._adults = null
      this._kids = null
      this._note = null
      this._search = ''
      this._sortBy = ''
      this._servicesSelected = []
      this._optionalsSelected = []
      this._tagSelected = []
      this._priceRange = [0, 1000]
      this.fields.productSelected.selected = []
      this.fields.productSelected.value = []
      this.resetValidation()
      this.fetchEntities()
    },
    submit () {
      try {
        if (!this.validate()) {
          throw I18N.load().validation.error.requiredFields
        }

        const data = this.getFormData()
        let t = null
        if (this._loadingOrder) {
          return
        }

        this._loadingOrder = true
        this.t = true
        t = setTimeout(() => {
          API.tryToBook(data)
            .then((r) => {
              this.showDialogSuccess(r)
              clearTimeout(t)
              this._loadingOrder = false
            }).catch((e) => {
              this.showDialogError(e)
              clearTimeout(t)
              this._loadingOrder = false
            })
        }, 500)
      } catch (e) {
        this.showDialogError(e)
        this.resetValidation()
      }
    }
  }
}
</script>
