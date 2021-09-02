<template>
  <v-row>
    <v-col md="4" sm="6" xs="12">
      <v-form v-model="valid" ref="form">
        <v-date-picker
          full-width
          no-title
          v-model="_date"
          :prev-icon="calendar.icon.arrowLeft"
          :next-icon="calendar.icon.arrowRight"
          :allowed-dates="allowedDates"
          :color="calendar.color.datePicker"
          :landscape="calendar.landscape"
          :locale="calendar.locale"
          :max="calendar.range.to"
          :min="calendar.range.from"
          v-on:click:date="fetchProducts"
        ></v-date-picker>

        <v-text-field
          v-model="_date"
          :label="calendar.input.checkInDate.label"
          :prepend-icon="calendar.input.checkInDate.icon"
          :hint="calendar.input.checkInDate.hint"
          disabled
          outlined
          persistent-hint
          readonly
          dense
        ></v-text-field>

        <v-select
          v-model="_checkInTime"
          :items="calendar.input.checkInTime.range"
          :rules="calendar.input.checkInTime.rules"
          :label="calendar.input.checkInTime.label"
          :prepend-icon="calendar.input.checkInTime.icon"
          outlined
          required
          dense
          v-on:change="fetchProducts()"
        ></v-select>

        <v-text-field
          v-model="_firstName"
          :rules="calendar.input.firstName.rules"
          :counter="calendar.input.firstName.maxlength"
          :label="calendar.input.firstName.label"
          :prepend-icon="calendar.input.firstName.icon"
          outlined
          required
          dense
        ></v-text-field>

        <v-text-field
          v-model="_lastName"
          :rules="calendar.input.lastName.rules"
          :counter="calendar.input.lastName.maxlength"
          :label="calendar.input.lastName.label"
          :prepend-icon="calendar.input.lastName.icon"
          outlined
          required
          dense
        ></v-text-field>

        <v-text-field
          v-model="_email"
          :rules="calendar.input.email.rules"
          :label="calendar.input.email.label"
          :prepend-icon="calendar.input.email.icon"
          outlined
          required
          dense
        ></v-text-field>

        <v-text-field
          v-model="_adults"
          :label="calendar.input.adults.label"
          :prepend-icon="calendar.input.adults.icon"
          :min="calendar.input.adults.min"
          :max="calendar.input.adults.max"
          :value="calendar.input.adults.default"
          outlined
          required
          dense
          type="number"
        ></v-text-field>

        <v-text-field
          v-model="_kids"
          :label="calendar.input.kids.label"
          :prepend-icon="calendar.input.kids.icon"
          :min="calendar.input.kids.min"
          :max="calendar.input.kids.max"
          :value="calendar.input.kids.default"
          outlined
          dense
          type="number"
        ></v-text-field>

        <v-select
          v-model="_productSelected"
          :items="_productSelected"
          :label="calendar.input.product.label"
          :prepend-icon="calendar.input.product.icon"
          :hint="calendar.input.product.hint"
          chips
          disabled
          multiple
          outlined
          persistent-hint
          readonly
          dense
          single-line
        ></v-select>

        <v-text-field
          v-model="_note"
          :label="calendar.input.note.label"
          :prepend-icon="calendar.input.note.icon"
          :max="calendar.input.note.max"
          :counter="calendar.input.note.max"
          outlined
          dense
        ></v-text-field>

        <template v-if="privacy.link.length">
          <div v-for="(link, i) in privacy.link" :key="i">
            <v-checkbox v-model="link.checkbox" :rules="link.rules">
              <template v-slot:label>
                <div @click.stop="">
                  {{ link.text }} <a v-bind:href="link.href">{{ link.label }}</a>
                </div>
              </template>
            </v-checkbox>
          </div>
        </template>

        <v-row text-xs-center class="my-4">
          <v-col xs="6">
            <v-btn width="100%" text outlined :color="calendar.input.submit.color.secondary" @click="reset">{{ calendar.input.reset.label }}</v-btn>
          </v-col>
          <v-col xs="6">
            <v-btn width="100%" text outlined :color="calendar.input.submit.color" @click="submit">{{ calendar.input.submit.label }}</v-btn>
          </v-col>
        </v-row>

        <v-dialog
          v-model="dialog.show"
          persistent
          max-width="290"
        >
          <v-card>
            <v-card-title class="headline">{{ dialog.current.title }}</v-card-title>
            <v-card-text>{{ dialog.current.text }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="dialog.show = false">
                {{ dialog.current.actions.label }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-form>
    </v-col>
    <v-col md="8" sm="6" xs="12">
      <template v-if="_products.length > 0">
        <v-row>
          <v-col v-for="(product, i) in _products" :key="i" md="12" lg="6" xl="4">
            <v-card class="mt-4" elevation="0" outlined>
              <v-row no-gutters>
                <v-col lg="12" md="6" sm="12">
                  <v-card-title v-if="product.contents.name">{{ product.contents.name }}</v-card-title>
                  <v-card-subtitle v-if="product.contents.short_description">
                    {{ product.contents.short_description }}
                  </v-card-subtitle>
                  <v-card-text v-if="product.relations && product.relations.services">
                    <template>
                      <v-chip
                        small
                        class="mr-2 mb-2"
                        :color="calendar.color.chip.bg"
                        :text-color="calendar.color.chip.text"
                        v-for="(service, s) in product.relations.services" :key="s">
                        <v-icon left>{{ calendar.icon.service }}</v-icon> {{ service.contents.name }}
                      </v-chip>
                    </template>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn text :color="products.actions.add.color" v-on:click="addOrRmoveProduct({id: product.id, name: product.contents.name})">
                      <v-icon>{{ product.action.icon }}</v-icon> {{ product.action.text }}
                    </v-btn>
                  </v-card-actions>
                </v-col>
                <v-col lg="12" md="6" sm="12">
                    <v-img :src="product.media" />
                </v-col>
                <v-col sm="12">
                  <v-expansion-panels>
                    <v-expansion-panel>
                      <v-expansion-panel-header :expand-icon="products.actions.expand.icon">
                        <div>
                          <v-chip
                            small
                            class="mr-2 mb-2"
                            :color="products.chip.bg"
                            :text-color="products.chip.textColor"
                            v-if="product.ecommerce.price_reduction">
                            <v-icon>{{ calendar.icon.offert }}</v-icon>
                            {{ product.ecommerce.price_reduction }}
                          </v-chip> {{ product.ecommerce.currency }} {{ product.ecommerce.price }}, <strong>{{ product.ecommerce.tax_included }}</strong>, {{ product.ecommerce.tax }}
                        </div>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <div>{{ product.contents.description }}</div>
                        <template v-if="product.attributes">
                          <div v-for="(group, g) in product.attributes" :key="g">
                            <v-list-item class="px-0" v-for="(attribute, a) in group.list" :key="a">
                              <v-list-item-content v-if="attribute.name">
                                <v-list-item-title>{{ attribute.name }}</v-list-item-title>
                                <v-list-item-subtitle v-for="(val, v) in attribute.value" :key="v">
                                  {{ val.value }}
                                </v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                          </div>
                        </template>
                        <v-list-item class="px-0">
                          <v-list-item-content>
                            <v-list-item-title v-if="products.note.label">{{ products.note.label }}</v-list-item-title>
                            <v-list-item-subtitle v-if="product.contents.note">{{ product.contents.note }}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <template v-if="product.relations.notices">
                          <v-alert
                            outlined
                            dense
                            color="info"
                            elevation="0"
                            v-for="(notice, n) in product.relations.notices" :key="n">
                            <v-list-item class="px-0" v-if="notice.contents.name">
                              <v-list-item-content>
                                <v-list-item-title>{{ notice.contents.name }}</v-list-item-title>
                                <v-list-item-subtitle>
                                  <div>{{ notice.contents.description }}</div>
                                  <div>
                                    {{ notice.calendars.date_start }}, {{ notice.calendars.time_start }} -
                                    {{ notice.calendars.date_end }}, {{ notice.calendars.time_end }}
                                  </div>
                                </v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                          </v-alert>
                        </template>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </template>
      <template v-if="_products.length === 0">
        <v-alert outlined text type="info">{{ products.notAvaible }}</v-alert>
      </template>
    </v-col>
  </v-row>
</template>

<script>
import { COLORS } from '../common/colors.js'
import * as FORM from '../common/form.js'
import { API } from '../common/http.js'
import { ICONS } from '../common/icons'
import { I18N } from '../common/locale.js'
import { Entity } from './models/entity.js'

export default {
  created () {
    this.fetchProducts()
  },
  data () {
    return {
      isLoading: false,
      dialog: FORM.DIALOG(
        I18N.load().actions.booking.success,
        I18N.load().form.validation.error.required
      ),
      valid: false,
      privacy: {
        link: FORM.CHECKBOX_PRIVACY
      },
      calendar: {
        landscape: false,
        color: {
          datePicker: COLORS.primary,
          chip: {
            text: COLORS.primary,
            bg: COLORS.white
          }
        },
        locale: I18N.getIso(),
        icon: {
          arrowLeft: ICONS.arrowLeft,
          arrowRight: ICONS.arrowRight,
          service: ICONS.star,
          offert: ICONS.star
        },
        range: {
          from: '',
          to: '',
          notAvaibleDate: []
        },
        date: '',
        input: {
          checkInDate: FORM.CHECKIN_DATE,
          checkInTime: FORM.CHECKIN_TIME,
          user: FORM.USER,
          firstName: FORM.FIRST_NAME,
          lastName: FORM.LAST_NAME,
          email: FORM.EMAIL,
          adults: FORM.ADULTS,
          kids: FORM.KIDS,
          product: FORM.PRODUCT_SELECTED,
          note: FORM.NOTE,
          reset: {
            label: I18N.load().actions.reset,
            color: COLORS.secondary
          },
          submit: {
            label: I18N.load().actions.sendRequest,
            color: COLORS.primary
          }
        }
      },
      products: {
        chip: {
          textColor: COLORS.white,
          bg: COLORS.orange
        },
        note: {
          label: I18N.load().common.note
        },
        actions: {
          expand: {
            icon: ICONS.arrowDown
          },
          icon: ICONS.add,
          text: I18N.load().actions.add,
          add: {
            icon: ICONS.add,
            text: I18N.load().actions.add,
            color: COLORS.primary
          },
          remove: {
            icon: ICONS.remove,
            text: I18N.load().actions.remove
          }
        },
        list: [],
        notAvaible: I18N.load().common.notAvaible
      }
    }
  },
  computed: {
    _date: {
      get () {
        return this.calendar.date || this.getDateNow()
      },
      set (date) {
        this.calendar.date = (date || this.getDateNow())
      }
    },
    _firstName: {
      get () {
        return this.calendar.input.firstName.value || ''
      },
      set (v) {
        this.calendar.input.firstName.value = v || ''
      }
    },
    _lastName: {
      get () {
        return this.calendar.input.lastName.value || ''
      },
      set (v) {
        this.calendar.input.lastName.value = v || ''
      }
    },
    _email: {
      get () {
        return this.calendar.input.email.value || ''
      },
      set (v) {
        this.calendar.input.email.value = v || ''
      }
    },
    _checkInTime: {
      get () {
        return this.calendar.input.checkInTime.value || this.calendar.input.checkInTime.default
      },
      set (v) {
        this.calendar.input.checkInTime.value = v || this.calendar.input.checkInTime.default
      }
    },
    _kids: {
      get () {
        return this.calendar.input.kids.value || 0
      },
      set (v) {
        this.calendar.input.kids.value = v || this.calendar.input.kids.default
      }
    },
    _adults: {
      get () {
        return this.calendar.input.adults.value || 0
      },
      set (v) {
        this.calendar.input.adults.value = v || this.calendar.input.adults.default
      }
    },
    _note: {
      get () {
        return this.calendar.input.note.value || ''
      },
      set (v) {
        this.calendar.input.note.value = v || ''
      }
    },
    _products: {
      get () {
        return this.products.list || []
      },
      set (v) {
        this.products.list = v || []
      }
    },
    _productSelected: {
      get () {
        const map = this.calendar.input.product.selected
          .map(o => o.name || '')
          .filter(v => v.length > 0)

        return map
      },
      set (v) {
        if (v.clean) {
          this.calendar.input.product.selected = []
        } else if (v.remove) {
          this.calendar.input.product.selected = this.calendar.input.product.selected.filter(s => s.name !== v.remove)
        } else {
          const find = this.isSelectedProduct(v.name)
          if (!find) {
            this.calendar.input.product.selected.push(v)
          }
        }
      }
    }
  },
  methods: {
    getDateNow () {
      const dateTime = new Date()
      const y = dateTime.getFullYear()
      let m = dateTime.getMonth() + 1
      m = (m < 10) ? '0' + m : m
      const d = dateTime.getDate()
      return y + '-' + m + '-' + d
    },
    getFormData () {
      return {
        localize: 1,
        language: sessionStorage.getItem('selectedLanguage') || '',
        date: this._date,
        time: this._checkInTime,
        firstName: this._firstName,
        lastName: this._lastName,
        email: this._email,
        adults: this._adults,
        kids: this._kids,
        products: this._productSelected.length > 0 ? this.calendar.input.product.selected.map(o => o.id) : [],
        note: this._note
      }
    },
    fetchProducts () {
      const formData = this.getFormData()
      let timeout = null
      if (this.isLoading) {
        return
      }
      this.isLoading = true
      timeout = setTimeout(() => {
        API.getAvaibleProducts(formData)
          .then((r) => {
            try {
              if (r.timeRange) {
                this.calendar.input.checkInTime.range = r.timeRange.avaible || []
                this.calendar.input.checkInTime.default = r.timeRange.default
                this.calendar.input.checkInTime.value = this.calendar.input.checkInTime.value || r.timeRange.default
              }

              if (r.dateRange) {
                this.calendar.range.notAvaibleDate = r.dateRange.notAvaible || []
                this.calendar.range.from = r.dateRange.from
                this.calendar.range.to = r.dateRange.to
              }

              const productList = (!r.products || !r.products.entities) ? [] : r.products.entities
              this.products.list = []
              for (const i in productList) {
                const entity = new Entity(productList[i])
                if (entity && entity.vo) {
                  const isSelected = this.isSelectedProduct(entity.vo.contents.name)
                  const action = isSelected ? this.products.actions.remove : this.products.actions.add
                  entity.vo.action = action
                  this.products.list.push(entity.vo)
                }
              }
            } catch (e) {
              this.products.list = []
            }
            this.isLoading = false
            clearTimeout(timeout)
          }).catch((e) => {
            this.products.list = []
            this.isLoading = false
            clearTimeout(timeout)
          })
      }, 500)
    },
    isSelectedProduct (name) {
      return this._productSelected.filter(v => v === name).length > 0
    },
    addOrRmoveProduct (o) {
      const find = this.isSelectedProduct(o.name)
      let btnAction = ''
      if (!find) {
        this._productSelected = o
        btnAction = this.products.actions.remove
      } else {
        this._productSelected = { remove: o.name }
        btnAction = this.products.actions.add
      }

      this.products.list = this.products.list.map(e => {
        if (e.id === o.id) {
          e.action = btnAction
        }
        return e
      })
    },
    allowedDates (v) {
      const now = new Date()
      const date = new Date(v)
      return (now.getTime() <= date.getTime()) && (this.calendar.range.notAvaibleDate.includes(v) === false)
    },
    showDialogError () {
      this.dialog.show = true
      this.dialog.current = this.dialog.error
    },
    showDialogSuccess () {
      this.dialog.show = true
      this.dialog.current = this.dialog.done
    },
    reset () {
      this._date = this.getDateNow()
      this._checkInTime = ''
      this._firstName = ''
      this._lastName = ''
      this._email = ''
      this._adults = ''
      this._kids = ''
      this._note = ''
      this._productSelected = { clean: true }
      for (const i in this.privacy.link) {
        this.privacy.link[i].checkbox = false
      }
      this.fetchProducts()
      this._products = this.products.list.map(o => {
        o.action = this.products.actions.add
        return o
      })
    },
    submit () {
      try {
        if (this._productSelected.length === 0) {
          throw I18N.load().form.validation.error.productsNotSelected
        }

        const formData = this.getFormData()
        API.sendBookingRequest(formData)
          .then((r) => {
            this.showDialogSuccess()
          }).catch((e) => {
            this.showDialogError()
          })
      } catch (e) {
        this.showDialogError()
      }
    }
  }
}
</script>
